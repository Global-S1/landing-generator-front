import { LandingGeneratorApi } from "@/api";
import { ApiImgResponse, ElementToEdit } from "@/interfaces";

interface Args {
  img: File;
  sectionId: string;
  data_id: string;
}

export const uploadImgApi = async (landingId: string,{img, sectionId, data_id}: Args) => {
  try {

    const formData = new FormData()
    formData.append('file', img)
    const resp = await LandingGeneratorApi.post<ApiImgResponse>(`/images/upload/${landingId}`, formData, {
      headers: {
        'content-type': 'multipart/form-data',
      },
      params: {
        sectionId,
        data_id
      }
    })

    const json = resp.data
    return {
      template: json.template,
      sections: json.sections as { [id: string]: ElementToEdit[] }
  }
  } catch (error) {
    return null
  }
}
