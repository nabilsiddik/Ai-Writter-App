
export const formatVideoUrl = (videoUrl: string) => {
   if(!videoUrl) return
   let videoId = "";
   let formatedVideoUrl = ''

   if(videoUrl.includes('youtu.be') || videoUrl.includes('youtube.com')){
     if(videoUrl.includes('youtube.com')){
       videoId = videoUrl.split('?')[1]
     }else if(videoUrl.includes('youtu.be')){
       videoId = videoUrl.split("/").pop()?.split("?")[0] ?? ""
     }
   }

   if(videoId){
    formatedVideoUrl = `https://www.youtube.com/embed/${videoId}`
   }

   return formatedVideoUrl
}
