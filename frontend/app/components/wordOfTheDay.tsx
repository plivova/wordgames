export function WordOfTheDay() {
    const date = new Date();

    return (
        <div className="flex justify-center items-center">
            <div className="w-3/4 p-3 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-secondary dark:border-secondary">
                <div className="flex justify-between items-center m-2">
                    <div className="text-4xl font-bold tracking-tight dark:text-white">
                        Slovní hry
                    </div>
                    <div className="text-right dark:text-white">
                        <div className="text-sm">
                            Slovo dne ({date.getDate()}.{date.getMonth() + 1}.{date.getFullYear()})
                        </div>
                        <div className="mb-3 font-normal">
                            {/*TODO: fetch word of the day & part of speech from db*/}
                            <div className="m-2 text-2xl font-bold tracking-tight">Dortík</div>
                            <div className="text-sm">podstatné jméno</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}