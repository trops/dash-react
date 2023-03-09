export default function AlgoliaNoResults({ text = 'No Results' }) {
    return (
        <div className="flex flex-col rounded bg-gray-900 border-dashed border-4 border-gray-800 p-10 w-full">
            <div className="text-4xl font-bold text-4xl text-gray-700">{text}</div>
        </div>
    )
}