import React, { useContext } from 'react'
import { SelectedObjectContext } from '../../three-components/SelectedObjectProvider';

function ColliderElement(props) {
    const {colliderList, setColliderList} = useContext(SelectedObjectContext)

    const handleDeleteCollider =()=>{
        setColliderList((prevMaps) => prevMaps.filter((element) => element.props.number !== props.number));
    }
    
  return (
    <div className='property-container'>
        <button className='button'>Collider</button>
    </div>
  )
}

export default ColliderElement