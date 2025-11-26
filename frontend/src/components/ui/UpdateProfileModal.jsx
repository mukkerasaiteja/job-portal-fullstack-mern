import { useState, useEffect } from "react";
import { Button } from "./button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./dialog";
import { Input } from "./input";
import { Label } from "./label";
import { Textarea } from "./textarea";
import { Spinner } from "./spinner";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_END_POINT } from "@/utilis/User_Endpoints";
import { setUser } from "@/redux/authSlice";

function UpdateProfileModal({ isModalOpen, setIsModalOpen }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(false);

  const [input, setInput] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    bio: "",
    skills: "",
    file: null,
  });

  //Reset modal inputs whenever it opens
  useEffect(() => {
    if (isModalOpen && user) {
      setInput({
        fullName: user.fullName || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        bio: user.profile?.bio || "",
        skills: user.profile?.skills?.join(", ") || "",
        file: null,
      });
    }
  }, [isModalOpen, user]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("fullName", input.fullName);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);

    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      const token = localStorage.getItem("token");

      const resp = await axios.put(
        `${USER_API_END_POINT}/profile/update`,
        formData,
        {
          headers: {
            Authorization: token,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (resp.status === 200) {
        toast.success(resp.data.message);
        //Update Redux user so UI refreshes instantly
        dispatch(setUser(resp.data.user));
        console.log(resp.data.user);
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="sm:max-w-[450px] border border-border bg-background text-foreground">
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
          <DialogDescription className="sr-only">
            Update your profile information
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Name */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="justify-end">
              Name
            </Label>
            <Input
              id="name"
              type="text"
              value={input.fullName}
              onChange={(e) => setInput({ ...input, fullName: e.target.value })}
              className="col-span-3"
            />
          </div>

          {/* Bio */}
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="bio" className="justify-end pt-2">
              Bio
            </Label>
            <Textarea
              id="bio"
              value={input.bio}
              onChange={(e) => setInput({ ...input, bio: e.target.value })}
              className="col-span-3"
            />
          </div>

          {/* Email */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="justify-end">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={input.email}
              onChange={(e) => setInput({ ...input, email: e.target.value })}
              className="col-span-3"
            />
          </div>

          {/* Phone Number */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone" className="justify-end">
              Number
            </Label>
            <Input
              id="phone"
              type="text"
              value={input.phoneNumber}
              onChange={(e) =>
                setInput({ ...input, phoneNumber: e.target.value })
              }
              className="col-span-3"
            />
          </div>

          {/* Skills */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="skills" className="justify-end">
              Skills
            </Label>
            <Input
              id="skills"
              type="text"
              value={input.skills}
              onChange={(e) => setInput({ ...input, skills: e.target.value })}
              placeholder="JavaScript, React, Node..."
              className="col-span-3"
            />
          </div>

          {/* Resume */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="resume" className="justify-end">
              Resume
            </Label>
            <Input
              id="resume"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setInput({ ...input, file: e.target.files[0] })}
              className="col-span-3"
            />
          </div>

          {/* Submit */}
          <DialogFooter>
            {loading ? (
              <Button disabled className="w-full">
                <Spinner className="mr-2" /> Updating...
              </Button>
            ) : (
              <Button type="submit" className="w-full">
                Update Profile
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default UpdateProfileModal;
