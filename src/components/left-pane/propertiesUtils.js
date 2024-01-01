
export const createNewProperties = (poiTypeLocal, properties) => {
    const baseProperties = {
      id: properties.length + 1,
      location: {
        x: 0,
        y: 0,
        z: 0,
      },
    };
  
    let additionalProperties;
  
    if (poiTypeLocal === "1") {
        // point cloud
        
        additionalProperties = {
          type:"point cloud",
          link1: 'liveUrl',
          link2: 'liveUrl',
          link3: 'liveUrl',
          link4: 'liveUrl',
        };
    }
    else if(poiTypeLocal === "2"){
        // cesium
        
        additionalProperties = {
          type:"cesium",
          accessToken: '1234',
          assetID: '2'
        };
    }
    else if(poiTypeLocal === "3"){
        // glb/gltf
        
        additionalProperties = {
          type:"glb",
          url:''
        };
    }
    else if(poiTypeLocal === "4"){
        // animated gltf
        
        additionalProperties = {
          type:"animated",
          url: 'animated gltf url'
        };
    }
    else if(poiTypeLocal === "5"){
        // image
        
        additionalProperties = {
          type:"image",
          url:'image url'
        };
    }
    else if(poiTypeLocal === "6"){
        // video
        
        additionalProperties = {
          type:"video",
          url:'vide url'
        };
    }
    else if(poiTypeLocal === "7"){
        // text
        
        additionalProperties = {
          type:"text",
          text:'',
          fontType:'arial',
          fontSize:20
        };
    }
    else if (poiTypeLocal === "8") {
      
      additionalProperties = {
        type:"audio",
        audioUrl: 'audio',
      };
    } else if (poiTypeLocal === "9") {
      
      additionalProperties = {
        type:"splat",
        url: 'https://huggingface.co/cakewalk/splat-data/resolve/main/garden.splat',
      };
    } 
    
  
    const newProperties = { ...baseProperties, ...additionalProperties };
  
    return newProperties;
  };
  