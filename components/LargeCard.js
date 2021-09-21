import Image from 'next/image'

function LargeCard({img, title, description, buttonText}) {
    return (
        <div className="relative py-16">
            <div className="relative h-96 min-w-[300px]"> 
                <Image src={img} layout="fill" objectFit="cover" className="rounded-2xl" />
            </div>
            <div className="absolute top-32 left-16">
                <h3 className="text-4xl w-64">{title}</h3>
                <p>{description}</p>
                <button className="text-sm text-white bg-gray-900 py-2 px-4 rounded-full mt-5">{buttonText}</button>
            </div>
        </div>
    )
}

export default LargeCard