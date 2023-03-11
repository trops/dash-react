export function ErrorMessage({ title, onClose }) {
    console.log("error ", title);
    return (
        <div
            onClick={onClose}
            className="flex flex-row w-full p-4 2xl:px-6 2xl:py-4 text-2xl xl:text3xl bg-indigo-700 opacity-75 rounded text-gray-300 dark:bg-indigo-800 dark:text-gray-200 font-bold"
        >
            {JSON.stringify(title)}
        </div>
    );
}
