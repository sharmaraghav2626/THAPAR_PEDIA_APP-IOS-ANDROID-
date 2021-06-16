import React, { useState, useEffect } from 'react';
import { Button,StyleSheet, Text, View, Image,Platform,Dimensions,TouchableOpacity,TouchableWithoutFeedback} from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const {height,width}=Dimensions.get('window');

export default function AddPost({navigation}) {
  const [cameraPermission, setCameraPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.front);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);  
  const [galleryPermission,setGalleryPermision]=useState(null);
  
  

  //handle double tap
  const [lastTap,setLastTap] = useState(null);
  const handleDoubleTap = () => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;
    if (lastTap && (now - lastTap) < DOUBLE_PRESS_DELAY) {
      setType(type==Camera.Constants.Type.front?
        Camera.Constants.Type.back:
        Camera.Constants.Type.front
        )
    } else {
      setLastTap(now);
    }
  }


  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setCameraPermission(status === 'granted');
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        setGalleryPermision(status==='granted');
      }else setGalleryPermision(true);
    })();
    }, []);

  // To click picture
  const takePicture=async()=>{
    if(camera){
        const data=await camera.takePictureAsync(null);
        setImage(data.uri);
    }
  }


  // Pick image from gallery.
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Image,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });  
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };


  if (cameraPermission === null || galleryPermission===null) {
    return <View />;
  }
  if (cameraPermission === false || galleryPermission===false) {
    return <Text>No access ! Please provide Permissions</Text>;
  }
  return (
    <View style={{flex:1}}>
        
            <TouchableOpacity style={styles.upload_post} onPress={()=>navigation.navigate('Upload',{image,id:'1'})}>
                 <MaterialCommunityIcons style={{alignSelf:'flex-end'}} name="arrow-right-bold-outline" color='white' size={50}/>
            </TouchableOpacity>
        <View style={styles.cameraContainer,image?styles.cameraContainer2:null}>
          <TouchableWithoutFeedback onPress={handleDoubleTap}>
              <Camera ref={(ref)=>setCamera(ref)} style={styles.fixedRatio} type={type} ratio={'1:1'}/>
          </TouchableWithoutFeedback>
        </View>
        {image && <Image source={{uri:image}} style={styles.image} />} 
          <View style={styles.bottom_container}>
            <TouchableOpacity  onPress={()=>setType(type==Camera.Constants.Type.front?
              Camera.Constants.Type.back:
              Camera.Constants.Type.front
              )}>

                 <MaterialCommunityIcons name="sync" color='white' size={50}/>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={takePicture}>
                 <MaterialCommunityIcons name="checkbox-blank-circle" color='white' size={50}/>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={pickImage}>
                 <MaterialCommunityIcons name="image" color='white' size={50}/>
            </TouchableOpacity>
            
          </View>
    </View>
  );
}

const styles = StyleSheet.create({
    
    fixedRatio:{
        height:height*0.75
    },bottom_container:{
      flex:1,
      flexDirection:'row',
      backgroundColor:'#111111',
      justifyContent:'space-evenly',
      padding:20
    },cameraContainer2:{
      height:height*0.4
    },image:{
      height:height*0.35,
      resizeMode: "contain",
    },upload_post:{
      flex:1,
      backgroundColor:"#111111",
    }
})