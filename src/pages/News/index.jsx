import { ListItem, UnorderedList } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import './News.styles.scss';

function News() {
  const [id, setId] = useState();
  const data = id?.model;
  const handleClick = (event) => {
    setId(event.currentTarget.id);
  };
  useEffect(() => {
    fetch(`http://localhost:3000/api/category/${id}`)
      .then((res) => res.json())
      .then((id) => {
        setId(id);
      });
  }, [id]);
  return (
    <div>
      <div className='dropdown'>
        {/* <button className='dropbtn'>Dropdown</button> */}
        <UnorderedList>
          <ListItem id='1' onMouseOver={handleClick}>
            iPhone
          </ListItem>
          <ListItem id='2' onMouseOver={handleClick}>
            iPad
          </ListItem>
          <ListItem id='4' onMouseOver={handleClick}>
            Apple Watch
          </ListItem>
          <ListItem id='4' onMouseOver={handleClick}>
            iMac
          </ListItem>
          <ListItem id='5' onMouseOver={handleClick}>
            Airpods
          </ListItem>
        </UnorderedList>
        <div className='dropdown-content'>
          {/* {data?.map((item) => (
            <p className='category-item_sub'>{item?.name}</p>
          ))} */}
        </div>
        {/* {isShown && (
          <UnorderedList className='dropdown-content'>
            {data?.map((item) => (
              <ListItem className='category-item_sub'>{item?.name}</ListItem>
            ))}
          </UnorderedList>
        )} */}
      </div>
    </div>
  );
}

export default News;
