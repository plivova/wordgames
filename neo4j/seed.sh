#!/bin/bash
set -e

NEO4J_USER="${NEO4J_USER:-neo4j}"
NEO4J_PASSWORD="${NEO4J_PASSWORD:-password}"

echo "Checking if Neo4j already has data..."
COUNT=$(cypher-shell -u "$NEO4J_USER" -p "$NEO4J_PASSWORD" "MATCH (w:Word) RETURN count(w) AS cnt" --format plain 2>/dev/null | tail -1)

if [ "$COUNT" != "0" ] && [ -n "$COUNT" ]; then
    echo "Neo4j already seeded ($COUNT words). Skipping import."
    exit 0
fi

echo "Seeding Neo4j..."

echo "Creating constraints..."
cypher-shell -u "$NEO4J_USER" -p "$NEO4J_PASSWORD" "CREATE CONSTRAINT word_id IF NOT EXISTS FOR (w:Word) REQUIRE w.id IS UNIQUE"
cypher-shell -u "$NEO4J_USER" -p "$NEO4J_PASSWORD" "CREATE CONSTRAINT letter_id IF NOT EXISTS FOR (l:Letter) REQUIRE l.id IS UNIQUE"

echo "Importing letters..."
cypher-shell -u "$NEO4J_USER" -p "$NEO4J_PASSWORD" "
LOAD CSV WITH HEADERS FROM 'file:///letters.csv' AS row
CREATE (l:Letter {id: toInteger(row.id), value: row.value})
"

echo "Importing words..."
cypher-shell -u "$NEO4J_USER" -p "$NEO4J_PASSWORD" "
CALL {
    LOAD CSV WITH HEADERS FROM 'file:///words.csv' AS row
    CREATE (w:Word {id: toInteger(row.id), text: row.text, pos: row.pos})
} IN TRANSACTIONS OF 1000 ROWS
"

echo "Importing NEXT relationships..."
cypher-shell -u "$NEO4J_USER" -p "$NEO4J_PASSWORD" "
CALL {
    LOAD CSV WITH HEADERS FROM 'file:///next_relationships.csv' AS row
    MATCH (source:Letter {id: toInteger(row.source)})
    MATCH (target:Letter {id: toInteger(row.target)})
    CREATE (source)-[:NEXT]->(target)
} IN TRANSACTIONS OF 1000 ROWS
"

echo "Importing ENDS_AT relationships..."
cypher-shell -u "$NEO4J_USER" -p "$NEO4J_PASSWORD" "
CALL {
    LOAD CSV WITH HEADERS FROM 'file:///ends_at_relationships.csv' AS row
    MATCH (source:Letter {id: toInteger(row.source)})
    MATCH (target:Word {id: toInteger(row.target)})
    CREATE (source)-[:ENDS_AT]->(target)
} IN TRANSACTIONS OF 1000 ROWS
"

echo "Neo4j seed complete!"
cypher-shell -u "$NEO4J_USER" -p "$NEO4J_PASSWORD" --format plain "
MATCH (l:Letter) WITH count(l) as letters
MATCH (w:Word) WITH letters, count(w) as words
MATCH ()-[n:NEXT]->() WITH letters, words, count(n) as nextRels
MATCH ()-[e:ENDS_AT]->()
RETURN letters, words, nextRels, count(e) as endsAtRels
"
