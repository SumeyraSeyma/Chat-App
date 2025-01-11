import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

export const useChatStore = create((set,get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const { data } = await axiosInstance.get("messages/users");

      set({ users: data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
        const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
        
        if (res?.data) {
            console.log("Server Response:", res.data);
            // messages kontrolü yapıldı
            const updatedMessages = Array.isArray(messages) ? [...messages, res.data] : [res.data];
            set({ messages: updatedMessages });
        } else {
            toast.error("Invalid response from server.");
        }
        
    } catch (error) {
        console.error("Error object:", error);
        toast.error(error?.response?.data?.message || "An error occurred.");
    }
},



  setSelectedUser: (selectedUser) => {
    set({ selectedUser });
  }

}));
