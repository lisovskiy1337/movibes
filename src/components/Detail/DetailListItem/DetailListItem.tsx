import React from 'react'

interface IProps {
    crewData: {
        id: number,
        name: string
    }[],
    title: string
}

const DetailListItem: React.FC<IProps> = ({ crewData, title }) => {
    return (
        <li className="border-b border-[#c3c3c3] py-4 text-[#3DD2CC]">
            <span className='text-[#E8E8E8]'>{title}: </span>
            {crewData?.slice(0, 3).map((member, i) => (
                <span key={member.id}>{(i ? ', ' : '') + member.name}</span>
            ))}
        </li>
    )
}

export default DetailListItem