import { useState, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { X, ImageIcon, Video, Smile, Send, ChevronDown, ChevronUp } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { useSelector, useDispatch } from "react-redux";
import { closePostModal } from "@/store/slices/postModal.slice";
import { useCreatePost, useCurrentUserQuery } from "@/features/profile/hooks/useUserProfile";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { useCloudinaryUpload } from "@/hooks/useCloudinaryUpload";
import { createPostSchema, type CreatePostPayload } from "./CreatePostSchema";
import { toast } from "sonner";

interface PreviewFile extends File {
  preview: string;
}

const CreatePostModal = () => {
  const { isOpen } = useSelector((s: any) => s.postModal);
  const dispatch = useDispatch();
  const { data } = useCurrentUserQuery();
  const user = data?.data;

  const [files, setFiles] = useState<PreviewFile[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const uploadToCloudinary = useCloudinaryUpload();
  const createPostMutation = useCreatePost();

  const form = useForm<CreatePostPayload>({
    resolver: zodResolver(createPostSchema),
    defaultValues: { description: "", media: undefined },
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const mappedFiles = acceptedFiles.map((file) =>
      Object.assign(file, { preview: URL.createObjectURL(file) })
    ) as PreviewFile[];
    setFiles((prev) => [...prev, ...mappedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [], "video/*": [] },
    multiple: true,
    maxSize: 100 * 1024 * 1024,
  });

  const removeFile = (name: string) => {
    setFiles((prev) => {
      const filtered = prev.filter((file) => file.name !== name);
      const removed = prev.find((file) => file.name === name);
      if (removed) URL.revokeObjectURL(removed.preview);
      return filtered;
    });
  };

  const handleSubmit = async (values: CreatePostPayload) => {
    let mediaId : string = "";

    if (files.length > 0) {
      const realFile = files[0];
      const { media }= await uploadToCloudinary.mutateAsync({ file : realFile, saveToDB: true });
      mediaId = media?._id ?? ""; 
      if(!media?._id){
        toast.error("Image upload failed. Please try again.");
      }
    }

    createPostMutation.mutate({
      mediaId: mediaId,
      description: values.description || "",
    });

    form.reset();
    setFiles((prev) => {
      prev.forEach((file) => URL.revokeObjectURL(file.preview));
      return [];
    });
    setIsExpanded(false);
    dispatch(closePostModal());
  };

  const handleClose = () => {
    if (!uploadToCloudinary.isPending && !createPostMutation.isPending) {
      form.reset();
      files.forEach((file) => URL.revokeObjectURL(file.preview));
      setFiles([]);
      setIsExpanded(false);
      dispatch(closePostModal());
    }
  };

  const isPosting = uploadToCloudinary.isPending || createPostMutation.isPending;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-[95vw] sm:max-w-lg md:max-w-xl p-0 rounded-2xl border-2 border-border shadow-2xl bg-card overflow-hidden">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <DialogHeader className="p-4 sm:p-5 border-b border-border">
              <DialogTitle className="text-lg sm:text-xl font-semibold text-primary text-center">
                Create Post
              </DialogTitle>
            </DialogHeader>

            <div className="max-h-[70vh] overflow-y-auto">
              <div className="p-4 sm:p-5 space-y-4">
                <div className="flex items-start gap-3">
                  <Avatar className="h-10 w-10 sm:h-12 sm:w-12 ring-2 ring-primary/20 shrink-0">
                    <AvatarImage className="object-cover" src={user?.profileImage} />
                    <AvatarFallback className="bg-gradient-to-br from-primary/20 to-accent/20 text-foreground font-semibold">
                      {user?.firstName?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground text-sm sm:text-base truncate">
                      {user?.firstName} {user?.lastName}
                    </p>
                  </div>
                </div>

                {/* COMPACT EXPANDABLE TEXTAREA - V3 */}
                <div className="relative border border-border rounded-xl overflow-hidden">
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="What's on your mind?"
                            className={`border-none shadow-none resize-none p-4 text-sm sm:text-base focus-visible:ring-0 bg-transparent placeholder:text-muted-foreground transition-all duration-300 ${
                              isExpanded ? 'min-h-[300px]' : 'min-h-[120px]'
                            }`}
                            disabled={isPosting}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex justify-between items-center px-4 pb-2 bg-muted/10">
                    <span className="text-xs text-muted-foreground">
                      {form.watch("description")?.length || 0} characters
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="h-7 text-xs"
                    >
                      {isExpanded ? (
                        <>
                          <ChevronUp className="h-3 w-3 mr-1" />
                          Compact
                        </>
                      ) : (
                        <>
                          <ChevronDown className="h-3 w-3 mr-1" />
                          Expand
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-muted-foreground">
                    <ImageIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    <Video className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    <span>Add photos or videos</span>
                  </div>

                  <div
                    {...getRootProps()}
                    className={`rounded-xl border-2 border-dashed p-6 sm:p-8 text-center cursor-pointer transition-all ${
                      isDragActive
                        ? "border-primary bg-primary/10"
                        : "border-border bg-muted/30 hover:border-primary/50"
                    }`}
                  >
                    <input {...getInputProps()} disabled={isPosting} />
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      {isDragActive
                        ? "Drop files here..."
                        : "Drag & drop or click to upload files"}
                    </p>
                  </div>

                  {files.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                      {files.map((file) => (
                        <div
                          key={file.name}
                          className="relative aspect-square rounded-xl overflow-hidden bg-muted group"
                        >
                          {file.type.startsWith("image/") ? (
                            <img
                              src={file.preview}
                              alt={file.name}
                              className="object-cover w-full h-full"
                            />
                          ) : (
                            <video
                              src={file.preview}
                              className="object-cover w-full h-full"
                            />
                          )}
                          
                          <button
                            onClick={() => removeFile(file.name)}
                            disabled={isPosting}
                            className="absolute top-1 right-1 sm:top-2 sm:right-2 bg-black/70 hover:bg-black/90 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
                          >
                            <X className="h-3 w-3 sm:h-4 sm:w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="px-4 sm:px-5 py-3 sm:py-4 flex justify-between items-center gap-3 border-t border-border bg-muted/20">
              <Button
                type="button"
                variant="ghost"
                onClick={handleClose}
                disabled={isPosting}
                className="text-sm sm:text-base"
              >
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={isPosting || (!form.watch("description") && files.length === 0)}
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-6 sm:px-8 text-sm sm:text-base font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                {isPosting ? "Posting..." : "Post"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostModal;
