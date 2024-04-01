import { LandingGeneratorApi } from "@/api";
import { ApiImgResponse, ElementToEdit } from "@/interfaces";

interface Args {
  img: File;
  sectionId: string;
  oldSrc: string;
}

export const uploadImgApi = async ({img, sectionId, oldSrc}: Args) => {
  try {

    const formData = new FormData()
    formData.append('file', img)
    const resp = await LandingGeneratorApi.post<ApiImgResponse>('/images/upload', formData, {
      headers: {
        'content-type': 'multipart/form-data',
      },
      params: {
        sectionId,
        oldSrc
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
