import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues, formState: { errors } } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        if (!userData || !userData.$id) {
            console.error('User data is not available');
            return;
        }

        const postData = {
            ...data,
            userId: userData.$id,
        };

        if (post) {
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

            if (file) {
                appwriteService.deleteFile(post.featuredImage);
            }

            try {
                const dbPost = await appwriteService.updatePost(post.$id, {
                    ...postData,
                    featuredImage: file ? file.$id : post.featuredImage,
                });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            } catch (error) {
                console.error('Error updating post:', error);
            }
        } else {
            try {
                const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

                if (file) {
                    postData.featuredImage = file.$id;
                }

                const dbPost = await appwriteService.createPost(data.slug, postData);

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            } catch (error) {
                console.error('Error creating post:', error);
            }
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    if (!userData || !userData.$id) {
        return <div className="text-center p-4">User is not authenticated. Please log in.</div>;
    }

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <div className="w-2/3 px-2">
                <Input
                    label={<span className="text-black dark:text-white">Title :</span>}
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                {errors.title && <span className="text-red-500 dark:text-red-300">Title is required.</span>}
                
                <Input
                    label={<span className="text-black dark:text-white">Slug :</span>}
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                {errors.slug && <span className="text-red-500 dark:text-red-300">Slug is required.</span>}
                
                <RTE label={<span className="text-black dark:text-white">Content :</span>} name="content" control={control} defaultValue={getValues("content")} />
                {errors.content && <span className="text-red-500 dark:text-red-300">Content is required.</span>}
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label={<span className="text-black dark:text-white">Featured Image :</span>}
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {errors.image && <span className="text-red-500 dark:text-red-300">Featured image is required.</span>}
                
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label={<span className="text-black dark:text-white">Status</span>}
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <div className="mt-4">
                    <Button type="submit" bgColor={post ? "bg-green-500" : "bg-blue-500"} className="w-full">
                        {post ? "Update" : "Submit"}
                    </Button>
                </div>
            </div>
        </form>
    );
}
