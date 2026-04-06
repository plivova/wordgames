
import Link from 'next/link';
import Image from 'next/image';

type GameCardProps = {
    title: string;
    imageSrc: string;
    href: string;
};

export function GameCard({ title, imageSrc, href }: GameCardProps) {
    return (
        <Link href={href} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/5 m-2">
            <div className="h-full bg-white border border-gray-200 rounded-2xl shadow-sm dark:bg-white dark:border-white hover:shadow-md transition-shadow duration-200">
                <div className="flex flex-col items-center px-4 pt-4 m-2">
                    <Image className="w-full h-36 object-contain mb-3" src={imageSrc} alt={title} width={200} height={144} />
                    <h5 className="text-xl font-bold text-gray-900 dark:text-gray-900">{title}</h5>
                </div>
            </div>
        </Link>
    );
}
