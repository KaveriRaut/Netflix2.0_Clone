import React from 'react'
import styled from 'styled-components';
import CardSlider from './CardSlider'

export default function Slider({movies}) {

    //to display only range of movies specified here ==> 10movies in each row
    const getMoviesFromRange=(from,to) => {
        return movies.slice(from,to);
    };

    // console.log({movies});
  return (
    <Container>
      <CardSlider title="Trending Now" data={getMoviesFromRange(0,10)} />
      <CardSlider title="New Releases" data={getMoviesFromRange(10,20)} />
      <CardSlider title="Blockbuster Movies" data={getMoviesFromRange(20,30)} />
      <CardSlider title="Popular On Netflix" data={getMoviesFromRange(30,40)} />
      <CardSlider title="Action Movies" data={getMoviesFromRange(40,50)} />
      <CardSlider title="Epics" data={getMoviesFromRange(50,60)} />
    </Container>
  );
};

const Container = styled.div``;
