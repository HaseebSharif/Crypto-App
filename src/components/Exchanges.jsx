import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { server } from '../index'
import { Container, HStack ,Text , VStack, Image , Heading} from '@chakra-ui/react'
import Loader from './Loader'
import { wrap } from 'framer-motion'

const Exchanges = () => {

  const [exchanges,setExchanges]=useState([])
  const [loading,setLoading]=useState(true)

useEffect(()=>{
  const fetchExchanges= async () => {
    const {data} = await axios.get(`${server}/exchanges`)
    setExchanges(data)
    setLoading(false)
  }
  fetchExchanges()
},[])

  return (
    
    <Container maxW={'container.xl'} marginLeft={'10'}>
      <h1>Top 100 MarketPlaces to buy Crypto</h1>
{
  loading ? <Loader/> : <>
  <HStack wrap={'wrap'}>
  {
    exchanges.map((i)=>(
      <ExchangeCard
                key={i.id}
                name={i.name}
                img={i.image}
                rank={i.trust_score_rank}
                url={i.url}
              />
    ))}
  </HStack>
  </>
  
}

    </Container>
  )
}


const ExchangeCard = ({ name, img, rank, url }) => (
  <a href={url} target={"blank"}>
   <div className="card" style={{width: 12 +'rem'}}>
  <img src={img} style={{width: 8 +'rem', marginLeft:26 +'px', marginTop:25+'px'}}className="card-img-top " alt="loading"/>
  <div className="card-body">
    <h5 className="card-title">{name}</h5>
    <h3 className="card-text">Rank # {rank}</h3>
    <a href={url} className="btn btn-primary">Visit Site</a>
  </div>
</div>
  </a>
);

export default Exchanges
