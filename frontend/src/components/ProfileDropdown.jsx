import { useState, useRef, useEffect } from "react";
import { User, LogOut, Edit, X } from "lucide-react";

const ProfileDropdown = ({ user, onLogout }) => {
    const [open, setOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState(user.profileImage || null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

    const dropdownRef = useRef(null);
    const fileInputRef = useRef(null);

    // Toggle dropdown
    const toggleDropdown = () => setOpen(prev => !prev);
    const closeDropdown = () => setOpen(false);

    // Close dropdown or popup when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setOpen(false);
                setShowLogoutConfirm(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Handle profile image change
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    // Confirm profile image upload
    const confirmUpload = () => {
        const updatedUser = { ...user, profileImage: previewImage };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setSelectedFile(null);
        alert("Profile image updated!");
    };

    // Logout confirmation
    const handleLogoutClick = () => setShowLogoutConfirm(true);
    const handleLogoutConfirm = () => {
        setShowLogoutConfirm(false);
        setOpen(false);
        onLogout();
    };
    const handleLogoutCancel = () => setShowLogoutConfirm(false);

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Profile Circle */}
            <div
                onClick={toggleDropdown}
                className="w-10 h-10 rounded-full bg-white text-rose-700 flex items-center justify-center cursor-pointer overflow-hidden shadow-md transition-transform duration-200 hover:scale-105"
                title={`${user.firstName} ${user.lastName}`}
            >
                {previewImage ? (
                    <img src={previewImage} alt="profile" className="w-full h-full object-cover" />
                ) : (
                    <User size={20} />
                )}
            </div>

            {/* Dropdown */}
            <div
                className={`absolute right-0 mt-3 w-80 bg-white text-gray-800 rounded-xl shadow-xl p-5 z-50
                transform transition-all duration-300 origin-top-right
                ${open ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"}`}
            >
                {/* Header */}
                <div className="flex justify-between items-center border-b pb-3 mb-3">
                    <h3 className="font-semibold text-gray-700 text-lg">Profile</h3>
                    <button onClick={closeDropdown} className="p-1 rounded hover:bg-gray-100 transition">
                        <X size={18} />
                    </button>
                </div>

                {/* User Info */}
                <div className="text-sm text-gray-700 space-y-1 mb-3">
                    <p><strong>First Name:</strong> {user.firstName}</p>
                    <p><strong>Last Name:</strong> {user.lastName}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Mobile:</strong> {user.mobile}</p>
                    <p><strong>Role:</strong> {user.role}</p>
                </div>

                {/* Profile Image Upload */}
                <div className="mb-4">
                    <button
                        onClick={() => fileInputRef.current.click()}
                        className="text-rose-700 font-medium hover:underline"
                    >
                        {previewImage ? "Change Profile Image" : "Add Profile Image"}
                    </button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        className="hidden"
                        accept="image/*"
                    />
                    {selectedFile && (
                        <button
                            onClick={confirmUpload}
                            className="block mt-2 bg-rose-600 text-white px-3 py-1 rounded hover:bg-rose-700 transition w-full"
                        >
                            Confirm Upload
                        </button>
                    )}
                </div>

                {/* Actions */}
                <button className="flex items-center gap-2 w-full py-2 px-2 hover:bg-gray-100 rounded transition mb-2">
                    <Edit size={18} /> Edit Profile
                </button>
                <button
                    onClick={handleLogoutClick}
                    className="flex items-center gap-2 w-full py-2 px-2 text-red-600 hover:bg-gray-100 rounded transition"
                >
                    <LogOut size={18} /> Logout
                </button>

                {/* Logout Confirmation Popup */}
                {showLogoutConfirm && (
                    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
                        <div className="bg-white rounded-xl shadow-lg p-6 w-80 relative">
                            {/* Close X */}
                            <button
                                onClick={handleLogoutCancel}
                                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition"
                            >
                                <X size={18} />
                            </button>
                            <h3 className="text-lg font-semibold mb-3 text-gray-800">Confirm Logout</h3>
                            <p className="text-gray-600 mb-5">Are you sure you want to logout?</p>
                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={handleLogoutCancel}
                                    className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleLogoutConfirm}
                                    className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium transition"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfileDropdown;