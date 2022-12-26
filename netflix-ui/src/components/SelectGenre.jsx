import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { fetchDataByGenre } from '../store';

export default function SelectGenre({ genres, type }) {
    const dispatch = useDispatch();
    return (
        <Select className='flex' onChange={(e) => {
            dispatch(fetchDataByGenre({ genres, genre: e.target.value, type, }))
        }}>
            {genres.map((genre) => {
                return (
                    <option value={genre.id} key={genre.id}>{genre.name}</option>
                );
            })}
        </Select>
    )
}

const Select = styled.select`
    margin-left: 5rem;
    padding: 10px;
    current: pointer;
    font-size: 1.4rem;
    background-color: rgba(0,0,0,0.4);
    color: white;
    border-width: thick;
    border-radius: 25px;
`;