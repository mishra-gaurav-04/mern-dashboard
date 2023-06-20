import React from 'react'

const Card = ({data}) => {

  return (
    <>
            {
                data.topic != "" && <div class="w-full max-w-sm p-10 bg-white border text-center border-gray-200 rounded-lg shadow-md ">
                <h5 class="mb-3 font-semibold text-2xl capitalize">
                    { data.topic}
                </h5>
                <div>
                    <ul>
                        <li>Source : {data.source}</li>
                        <li>Sector : {data.sector}</li>
                        <li>Intensity : {data.intensity}</li>
                        <li>Relevance : {data.relevance}</li>
                        <li>LikliHood : {data.liklehood}</li>
                        <li>Pestle : {data.pestle}</li>
                        <li>Counry : {data.country}</li>
                    </ul>
                </div>
            </div>        
            }
    </>
  )
}

export default Card


