'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Toaster, toast } from 'react-hot-toast';

export default function DashboardPage() {
  const [apiKeys, setApiKeys] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [newKeyName, setNewKeyName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState(null);
  const [showNewKey, setShowNewKey] = useState(false);
  const [newlyCreatedKey, setNewlyCreatedKey] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newKeyType, setNewKeyType] = useState('development'); // 'development' or 'production'
  const [monthlyLimit, setMonthlyLimit] = useState(1000);
  const [hasMonthlyLimit, setHasMonthlyLimit] = useState(true);
  const [visibleKeys, setVisibleKeys] = useState(new Set());
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingKey, setEditingKey] = useState(null);
  const [newName, setNewName] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingKey, setDeletingKey] = useState(null);

  // Fetch API keys on component mount
  useEffect(() => {
    fetchApiKeys();
  }, []);

  const fetchApiKeys = async () => {
    try {
      setIsLoading(true);
      // TODO: Replace with your actual API endpoint
      const response = await fetch('/api/keys');
      const data = await response.json();
      setApiKeys(data);
    } catch (err) {
      setError('Failed to load API keys');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async (value) => {
    try {
      await navigator.clipboard.writeText(value);
      toast.success('API key copied to clipboard', {
        duration: 2000,
        position: 'bottom-right',
        style: {
          background: '#10B981',
          color: 'white',
        },
        icon: '📋',
      });
    } catch (err) {
      toast.error('Failed to copy API key');
    }
  };

  const handleCreateKey = async () => {
    if (!newKeyName.trim()) {
      toast.error('Please enter a key name');
      return;
    }

    try {
      setIsCreating(true);
      setError(null);
      const response = await fetch('/api/keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name: newKeyName,
          type: newKeyType,
          monthlyLimit: hasMonthlyLimit ? monthlyLimit : null
        }),
      });

      if (!response.ok) throw new Error('Failed to create API key');

      const newKey = await response.json();
      setApiKeys([...apiKeys, newKey]);
      setShowCreateModal(false);
      setNewKeyName('');
      setNewKeyType('development');
      setMonthlyLimit(1000);
      setNewlyCreatedKey(newKey);
      setShowNewKey(true);
      toast.success('API key created successfully', {
        duration: 3000,
        position: 'bottom-right',
      });
    } catch (err) {
      toast.error('Failed to create API key');
      console.error(err);
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeleteKey = async () => {
    if (!deletingKey) return;

    const deleteToast = toast.loading('Deleting API key...');

    try {
      const response = await fetch(`/api/keys/${deletingKey.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete API key');

      setApiKeys(apiKeys.filter(key => key.id !== deletingKey.id));
      toast.success('API key deleted successfully', {
        id: deleteToast,
      });
      setShowDeleteModal(false);
    } catch (err) {
      toast.error('Failed to delete API key', {
        id: deleteToast,
      });
      console.error(err);
    } finally {
      setDeletingKey(null);
    }
  };

  const toggleKeyVisibility = (keyId) => {
    setVisibleKeys(prev => {
      const newSet = new Set(prev);
      if (newSet.has(keyId)) {
        newSet.delete(keyId);
      } else {
        newSet.add(keyId);
      }
      return newSet;
    });
  };

  const handleEditKey = async () => {
    if (!newName.trim() || !editingKey) {
      toast.error('Please enter a key name');
      return;
    }

    try {
      const response = await fetch(`/api/keys/${editingKey.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newName }),
      });

      if (!response.ok) throw new Error('Failed to update API key');

      const updatedKey = await response.json();
      setApiKeys(apiKeys.map(key => 
        key.id === editingKey.id ? { ...key, name: newName } : key
      ));
      setShowEditModal(false);
      toast.success('API key name updated successfully');
    } catch (err) {
      toast.error('Failed to update API key name');
      console.error(err);
    }
  };

  const filteredKeys = apiKeys.filter(key => 
    key.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900/50">
      <Toaster />
      {/* Header */}
      <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm px-8 py-4">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-400">Pages</span>
          <span className="text-gray-400">/</span>
          <span className="text-gray-600 dark:text-gray-300">Overview</span>
        </div>
      </div>

      <div className="p-8 max-w-7xl mx-auto space-y-6">
        {/* Plan Overview */}
        <div className="bg-gradient-to-r from-pink-50/50 to-blue-50/50 dark:from-pink-900/10 dark:to-blue-900/10 backdrop-blur-sm rounded-xl p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="text-sm text-gray-500 mb-1">CURRENT PLAN</div>
              <h2 className="text-2xl font-semibold mb-4">Researcher</h2>
              <div className="text-sm text-gray-500 mb-1">API Usage</div>
              <div className="h-2 w-64 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full w-[3.2%] bg-blue-500 rounded-full" />
              </div>
              <div className="text-sm mt-1">32/1,000 Credits</div>
              <div className="flex items-center gap-2 mt-2">
                <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
                <span className="text-sm text-gray-600">Pay as you go</span>
              </div>
            </div>
            <button className="px-4 py-2 text-sm rounded-full bg-white shadow-sm hover:shadow">
              Manage Plan
            </button>
          </div>
        </div>

        {/* API Keys Section */}
        <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl">
          <div className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-1">API Keys</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  The key is used to authenticate your requests to the Research API. To learn more, see the documentation page.
                </p>
              </div>
              <button
                onClick={() => setShowCreateModal(true)}
                className="px-4 py-2 bg-blue-500/90 hover:bg-blue-600/90 text-white rounded-lg transition-colors"
              >
                + Create New Key
              </button>
            </div>
          </div>

          <div className="p-6">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search keys..."
              className="w-full px-4 py-2 bg-gray-50/50 dark:bg-gray-900/50 border-0 rounded-lg mb-4 focus:ring-1 focus:ring-blue-500"
            />

            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-500">
                  <th className="pb-3 font-normal">NAME</th>
                  <th className="pb-3 font-normal">TYPE</th>
                  <th className="pb-3 font-normal">USAGE</th>
                  <th className="pb-3 font-normal">KEY</th>
                  <th className="pb-3 font-normal">OPTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {filteredKeys.map((key) => (
                  <tr key={key.id} className="border-b last:border-0">
                    <td className="py-4">{key.name}</td>
                    <td className="py-4">
                      <span className="px-2 py-1 bg-gray-100 rounded-md text-sm">
                        {key.value.includes('prod') ? 'prod' : 'dev'}
                      </span>
                    </td>
                    <td className="py-4">{key.usage || 0}</td>
                    <td className="py-4">
                      <code className="text-sm font-mono">
                        {visibleKeys.has(key.id) 
                          ? key.value
                          : key.value.replace(/^(junfan-(?:dev|prod)-[a-z0-9]{4}).*$/, '$1••••••••••••••••')}
                      </code>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <button 
                          onClick={() => toggleKeyVisibility(key.id)}
                          className="hover:text-gray-900 flex items-center gap-1"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            {visibleKeys.has(key.id) ? (
                              <>
                                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
                                <circle cx="12" cy="12" r="3" />
                                <line x1="2" y1="2" x2="22" y2="22" />
                              </>
                            ) : (
                              <>
                                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
                                <circle cx="12" cy="12" r="3" />
                              </>
                            )}
                          </svg>
                          {visibleKeys.has(key.id) ? 'Hide' : 'View'}
                        </button>
                        <button 
                          onClick={() => copyToClipboard(key.value)}
                          className="hover:text-gray-900 flex items-center gap-1"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                          </svg>
                          Copy
                        </button>
                        <button 
                          onClick={() => {
                            setEditingKey(key);
                            setNewName(key.name);
                            setShowEditModal(true);
                          }}
                          className="hover:text-gray-900 flex items-center gap-1"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                          </svg>
                          Edit
                        </button>
                        <button 
                          onClick={() => {
                            setDeletingKey(key);
                            setShowDeleteModal(true);
                          }}
                          className="text-red-500 hover:text-red-600 flex items-center gap-1"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M3 6h18"></path>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path>
                            <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                          </svg>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {isLoading && (
              <div className="text-center py-8">
                <div className="inline-block animate-spin text-gray-400 text-2xl">↻</div>
              </div>
            )}

            {!isLoading && filteredKeys.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No API keys found
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Create Key Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white/90 dark:bg-gray-800/90 rounded-xl max-w-2xl w-full p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Create a new API key</h2>
            <p className="text-gray-600 mb-8">Enter a name and limit for the new API key.</p>

            {/* Key Name Input */}
            <div className="mb-8">
              <label className="block text-lg text-gray-700 mb-2">
                Key Name — A unique name to identify this key
              </label>
              <input
                type="text"
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
                placeholder="Key Name"
                className="w-full px-4 py-3 text-lg border rounded-lg"
              />
            </div>

            {/* Key Type Selection */}
            <div className="mb-8">
              <label className="block text-lg text-gray-700 mb-2">
                Key Type — Choose the environment for this key
              </label>
              <div className="space-y-3">
                <label className="block p-4 border rounded-lg cursor-pointer hover:border-gray-400">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="keyType"
                      value="production"
                      checked={newKeyType === 'production'}
                      onChange={(e) => setNewKeyType(e.target.value)}
                      className="w-4 h-4 text-blue-500"
                    />
                    <div>
                      <div className="font-medium">Production</div>
                      <div className="text-gray-500">Rate limited to 1,000 requests/minute</div>
                    </div>
                  </div>
                </label>

                <label className="block p-4 border rounded-lg cursor-pointer hover:border-gray-400">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="keyType"
                      value="development"
                      checked={newKeyType === 'development'}
                      onChange={(e) => setNewKeyType(e.target.value)}
                      className="w-4 h-4 text-blue-500"
                    />
                    <div>
                      <div className="font-medium">Development</div>
                      <div className="text-gray-500">Rate limited to 100 requests/minute</div>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Monthly Usage Limit */}
            <div className="mb-8">
              <label className="flex items-center gap-2 mb-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasMonthlyLimit}
                  onChange={(e) => setHasMonthlyLimit(e.target.checked)}
                  className="w-4 h-4 text-blue-500"
                />
                <span className="text-lg text-gray-700">Limit monthly usage*</span>
              </label>
              {hasMonthlyLimit && (
                <input
                  type="number"
                  value={monthlyLimit}
                  onChange={(e) => setMonthlyLimit(parseInt(e.target.value))}
                  className="w-full px-4 py-3 text-lg border rounded-lg"
                />
              )}
              <p className="text-sm text-gray-500 mt-2">
                * If the combined usage of all your keys exceeds your plan&apos;s limit, all requests will be rejected.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-6 py-2 text-gray-700 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateKey}
                disabled={isCreating}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-blue-300"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Key Modal */}
      {showNewKey && newlyCreatedKey && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-2">API Key Created Successfully</h3>
            <p className="text-sm text-gray-600 mb-4">
              Please copy your API key now. You won&apos;t be able to see it again!
            </p>
            <div className="bg-gray-50 p-3 rounded-md mb-4">
              <code className="text-sm break-all">{newlyCreatedKey.key}</code>
            </div>
            <button
              onClick={() => setShowNewKey(false)}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* Edit Key Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white/90 dark:bg-gray-800/90 rounded-xl max-w-md w-full p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Edit API Key Name</h2>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Name
              </label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter new name"
              />
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                onClick={handleEditKey}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white/90 dark:bg-gray-800/90 rounded-xl max-w-md w-full p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Delete API Key</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Are you sure you want to delete this API key? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeletingKey(null);
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteKey}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 