import conf from "../conf/conf";
import { Client, ID,Databases,Storage,Query } from "appwrite";


export class Service{
    client = new Client();
    database;
    bucket;
    
    constructor(){
        this.client
        .setEndpoint(conf.appwriteURL)
        .setProject(conf.appwriteProjectId)
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async createPost(slug, postData) {
        try {
            const { title, content, featuredImage, status, userId } = postData || {}; // Use an empty object to avoid destructuring undefined
    
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            );
        } catch (error) {
            console.log("error came", error);
        }
    }
    

    async updatePost(slug,{title,content,featuredImage,status}){
        try {
            return  await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug, //any id can be there, can also use ID
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )

        } catch (error) {
            console.log("error came", error)
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug //any id can be there, can also use ID
            )
            return true
        } catch (error) {
            console.log("error lol", error)
            return false
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug //any id can be there, can also use ID
            )
        } catch (error) {
            console.log("error is coming", error)
            return false
        }
    }

    async getPosts(quaries = [Query.equal("status","active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                quaries
            )

        } catch (error) {
            console.log("error came in getPosts", error)
            return false;
        }
    }

    //File Upload service

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file,
            )
        } catch (error) {
            console.log("error came", error);
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("error here", error);
            return false;
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
}


const service = new Service();

export default service
