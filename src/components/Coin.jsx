import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { server } from '../index'
import { Container, HStack ,Text , VStack, Image , Heading} from '@chakra-ui/react'
import Loader from './Loader'
import { wrap } from 'framer-motion'

const Coin = () => {

  const [coins,setCoins]=useState([])
  const [loading,setLoading]=useState(true)

useEffect(()=>{
  const fetchCoins= async () => {
    const {data} = await axios.get(`${server}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en`)
    setCoins(data)
    setLoading(false)
  }
  fetchCoins()
},[])

  return (
    <Container maxW={'container.xl'} marginLeft={'10'}>
      <h1>Top 100 Crypto Currencies</h1>
{
  loading ? <Loader/> : <>
  <HStack wrap={'wrap'}>
  {
    coins.map((i)=>(
      <ExchangeCard
                key={i.id}
                name={i.name}
                img={i.image}
                rank={i.market_cap_rank}
                prize={i.current_price}
              />
    ))}
  </HStack>
  </>
  
}

    </Container>
  )
}


const ExchangeCard = ({ name, img, rank, prize }) => (
  <a href='' target={"blank"}>
   <div className="card" style={{width: 12 +'rem'}}>
  <img src={img} style={{width: 8 +'rem', marginLeft:26 +'px', marginTop:25+'px'}}className="card-img-top " alt="loading"/>
  <div className="card-body">
    <h5 className="card-title">{name}</h5>
    <h3 className="card-text">Rank # {rank}</h3>
    <a href='' className="btn btn-primary">Prize:${prize}</a>
  </div>
</div>
  </a>
);

export default Coin
