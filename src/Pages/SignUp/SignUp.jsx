import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { BsEye, BsEyeSlash } from "react-icons/bs";
import { ImSpinner9 } from "react-icons/im";
import { toast } from "react-toastify";
import useAuth from "../../Hooks/useAuth";
import { useState } from "react";
import SocialLogin from "../../Components/Shared/SocialLogin";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const imgHostingKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const imgHostingApi = `https://api.imgbb.com/1/upload?key=${imgHostingKey}`;

const SignUp = () => {
  const { signUpWithEmail, updateUser, logOut, loading, setLoading } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true)
    const imageFile = { image: data?.image[0] };
    const res = await axiosPublic.post(imgHostingApi, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    const photo = res.data.data.display_url;
    if (res?.data?.success) {
      try {
        signUpWithEmail(data?.email, data?.password).then((response) => {
          if (response?.user?.email) {
            toast.success("Profile Created.");
            try {
              updateUser(data?.name, photo).then(() => {
                toast.success("Profile Updated.");
                const user = {
                  email: data?.email,
                  name: data?.name,
                  photoURL: photo,
                  role: "user",
                };
                axiosPublic
                  .put("/users", user)
                  .then((res) => {
                    if (
                      res?.data?.upsertedCount ||
                      res?.data?.modifiedCount
                    ) {
                      try {
                        logOut().then(() => {
                          navigate("/logIn");
                        });
                      } catch (error) {
                        console.log(error);
                      }
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              });
            } catch (error) {
              console.log(error);
            }
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <div
        className="min-h-screen py-[10vh]"
        
      >
        <div
          className="max-w-screen-xl mx-auto min-h-[80vh] flex flex-col md:flex-row-reverse justify-center items-center gap-10 py-10"
          
        >
          {/* <div className="flex-1">
            <img src={img2} alt="IMAGE" />
          </div> */}
          <div className="flex-1">
            <form onSubmit={handleSubmit(onSubmit)} className="w-2/3 mx-auto">
              <input
                {...register("name", { required: true })}
                className="w-full h-11 outline-none px-5 bg-white border border-[#D0D0D0] rounded text-sm"
                type="text"
                placeholder="Name"
                required
              />

              <input
                {...register("email", { required: true })}
                className="w-full h-11 outline-none px-5 mt-4 bg-white border border-[#D0D0D0] rounded"
                type="email"
                placeholder="Email"
                required
              />

              <label
                htmlFor="dropzone-file"
                className="flex items-center px-3 py-3 mx-auto mt-4 text-center bg-white border border-dashed border-[#D0D0D0] rounded cursor-pointer"
              >
                {/* <h2 className="mx-1 text-gray-400">Profile Photo</h2> */}

                <input
                  {...register("image", { required: true })}
                  id="dropzone-file"
                  type="file"
                  // className="hidden"
                  required
                />
              </label>

              <div className="relative">
                <input
                  {...register("password", {
                    required: true,
                    pattern:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/,
                  })}
                  aria-invalid={errors.password ? "true" : "false"}
                  className="w-full h-11 outline-none px-5 mt-4 bg-white border border-[#D0D0D0] rounded"
                  type={show ? "text" : "password"}
                  placeholder="Password"
                  required
                />
                {errors?.password?.type === "pattern" && (
                  <p className="mt-2 mx-1 text-red-600">
                    Password must have one uppercase, one lowercase, one special
                    characters & one number
                  </p>
                )}
                {errors?.password?.type === "required" && (
                  <p className="mt-2 mx-1 text-red-600">
                    Password must have to set.
                  </p>
                )}
                <div
                  className="absolute right-2 top-[30px] inline-block cursor-pointer"
                  onClick={() => setShow(!show)}
                >
                  {show ? <BsEyeSlash></BsEyeSlash> : <BsEye></BsEye>}
                </div>
              </div>

              <button className="btn w-full mt-4 bg-[#D1A054B3] hover:bg-[#D1A054B3] rounded">
                {loading ? (
                  <ImSpinner9 className="animate-spin text-lg"></ImSpinner9>
                ) : (
                  "Sign Up"
                )}
              </button>
            </form>
            <div className="w-2/3 mx-auto">
              <div className="my-4 text-center">
                <p>
                  Already have an account?{" "}
                  <Link
                    className="text-lg font-bold text-[#D1A054B3]"
                    to="/logIn"
                  >
                    Log In
                  </Link>
                </p>
                <p>Or Sign Up With</p>
                <SocialLogin></SocialLogin>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
