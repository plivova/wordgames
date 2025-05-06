
import Link from 'next/link';

type GameCardProps = {
    title: string;
    imageSrc: string;
    href: string;
};

export function GameCard({ title, imageSrc, href }: GameCardProps) {
    return (
        <Link href={href} className="w-1/6 m-2">
            <div className="h-full bg-white border border-gray-200 rounded-2xl shadow-sm dark:bg-white dark:border-white hover:shadow-md transition-shadow duration-200">
                <div className="flex flex-col items-center px-4 pt-4 m-2">
                    <img className="w-full h-36 object-contain mb-3" src={imageSrc} alt={title} />
                    <h5 className="text-xl font-bold text-gray-900 dark:text-gray-900">{title}</h5>
                </div>
            </div>
        </Link>
    );
}
