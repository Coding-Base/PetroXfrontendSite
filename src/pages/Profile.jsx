import React, { useEffect, useState, useRef } from 'react';
import { fetchUserProfile } from '@/api';
import api from '@/api';
import { toast } from 'sonner';

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [previewSrc, setPreviewSrc] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await fetchUserProfile();
        setProfile(res.data || null);
      } catch (err) {
        console.error('Failed to fetch profile', err);
        toast.error('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  useEffect(() => {
    if (!imageFile) {
      setPreviewSrc(null);
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => setPreviewSrc(e.target.result);
    reader.readAsDataURL(imageFile);
    return () => reader.abort && reader.abort();
  }, [imageFile]);

  const handleFileChange = (e) => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    if (!f.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }
    setImageFile(f);
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      // 1) Patch basic fields
      const patchData = {
        username: profile?.username,
        email: profile?.email,
        first_name: profile?.first_name,
        last_name: profile?.last_name,
      };
      await api.patch('/api/auth/me/', patchData);

      // 2) If image selected, upload as multipart (backend supports PATCH /api/auth/me/ with file)
      if (imageFile) {
        const fd = new FormData();
        fd.append('avatar', imageFile);
        await api.patch('/api/auth/me/', fd, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }

      toast.success('Profile updated');
      // refresh
      const res = await fetchUserProfile();
      setProfile(res.data || null);
      setImageFile(null);
      setPreviewSrc(null);
    } catch (err) {
      console.error('Failed to save profile', err);
      toast.error(err?.response?.data?.detail || 'Failed to save profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl rounded-xl bg-white p-6 shadow-md">
      <h2 className="mb-4 text-2xl font-semibold text-gray-800">Profile</h2>

      {!profile ? (
        <p className="text-gray-600">No profile data available.</p>
      ) : (
        <div className="space-y-6">
          <div className="flex items-start space-x-6">
            <div>
              <div className="h-24 w-24 rounded-full overflow-hidden bg-gray-100">
                <img
                  src={previewSrc || profile?.avatar || 'https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001882.png'}
                  alt="avatar"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="mt-2">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="mt-2 rounded-md bg-gray-100 px-3 py-1 text-sm"
                >
                  Change Picture
                </button>
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
              </div>
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                value={profile.username || ''}
                onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 mt-1"
              />

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={profile.email || ''}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">First name</label>
                  <input
                    type="text"
                    value={profile.first_name || ''}
                    onChange={(e) => setProfile({ ...profile, first_name: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 mt-1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Last name</label>
                  <input
                    type="text"
                    value={profile.last_name || ''}
                    onChange={(e) => setProfile({ ...profile, last_name: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 mt-1"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={handleSave}
              disabled={saving}
              className="rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-5 py-2.5 font-medium text-white transition hover:from-blue-700 hover:to-blue-800 disabled:opacity-60"
            >
              {saving ? 'Saving…' : 'Save Changes'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
