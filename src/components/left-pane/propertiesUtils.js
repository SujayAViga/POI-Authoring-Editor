
export const createNewProperties = (poiTypeLocal, properties) => {
    const baseProperties = {
      poiId:'',
      assetCreated: false,
      id: properties.length,
      location: {
        x: 0,
        y: 0,
        z: 0,
      },
      rotation:{
        x: 0,
        y: 0,
        z: 0,
        w: 0
      },
      scale:{
        x: 1,
        y: 1,
        z: 1,
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
          // assetID: '2342663',
          assetID: '',
          accessToken : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyZjk1OTU2My1mNDBhLTQzYzEtOTcxMS01MzNiOWIxMDZiYTMiLCJpZCI6MTY2MDkxLCJpYXQiOjE2OTQ1NDMyOTN9.rHxFqNMZ26EFHwHYUJ-xW0fDZtjamHXiM-4HR6YIHXY'
        };
    }
    else if(poiTypeLocal === "3"){
        // glb/gltf
        
        additionalProperties = {
          type:"glb",
          url:'',
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
          title:'',
          about:''
        }
    }
    else if (poiTypeLocal === "8") {
      
      additionalProperties = {
        type:"audio",
        audioUrl: 'audio',
      };
    } else if (poiTypeLocal === "9") {
      
      additionalProperties = {
        type:"splat",
        locale:"English",
        url: '',
      };
    }else if(poiTypeLocal==="10"){
      additionalProperties = {
        type:"portal",
        exitLocation:{
          x:0,
          y:0,
          z:0
        }
      }
    }
    
  
    const newProperties = { ...baseProperties, ...additionalProperties };
  
    return newProperties;
  };
  