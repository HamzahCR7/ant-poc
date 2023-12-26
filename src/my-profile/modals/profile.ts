interface Profile {
    firstName?: string,
    lastName?: string | null,
    address?: Address,
    phone?:number,
    jobPosition?: string,
    workingMode?: string,
    gender?: string,
    dob?:string,
    cv?: UploadedFile
}

interface UploadedFile {
    uid: string;
    name: string;
    status: 'done' | 'uploading' | 'error' | 'removed';
    url?: string;
  }

interface Address {
    street1?: string,
    street2?: string,
    city?: string,
    state?:string,
    postCode?: number,
    country?: string

}

export default Profile;