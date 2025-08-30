import React from 'react';
import { X, Github, FileText, GitPullRequest, Plus } from 'lucide-react';

interface AddCompanySidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddCompanySidebar: React.FC<AddCompanySidebarProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-gray-900/95 backdrop-blur-xl border-l border-gray-700/60 z-50 transform transition-transform duration-500 ease-out shadow-2xl ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        
        {/* Header with gradient */}
        <div className="relative bg-gradient-to-r from-emerald-400 via-cyan-500 to-purple-600 p-6 shadow-lg">
          <div className="absolute inset-0 bg-black/30"></div>
          
          <div className="relative flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative flex-shrink-0">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-cyan-500 to-purple-600 rounded-xl blur-lg opacity-70"></div>
                <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-white shadow-2xl flex items-center justify-center">
                  <Plus className="h-8 w-8 text-gray-800" />
                </div>
              </div>
              
              <div>
                <h2 className="text-3xl font-black text-white mb-2 drop-shadow-lg">
                  Add Your Company
                </h2>
                <div className="text-white/90 font-medium text-base">
                  Join the AI Radar via GitHub
                </div>
              </div>
            </div>
            
            <button
              onClick={onClose}
              className="w-10 h-10 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-lg flex items-center justify-center text-white/80 hover:text-white transition-all duration-200 border border-white/20 hover:scale-110 active:scale-95"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6 space-y-8 overflow-y-auto" style={{ height: 'calc(100vh - 200px)', paddingBottom: '120px' }}>
          
          {/* Introduction */}
          <div className="bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-purple-500/10 rounded-lg p-6 border border-emerald-500/20">
            <p className="text-gray-200 text-lg leading-relaxed">
              Ready to showcase your AI company? Follow these simple steps to add your company to the AI Radar through GitHub.
            </p>
          </div>

          {/* Step 1: Go to GitHub */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                1
              </div>
              <h3 className="text-xl font-semibold text-white flex items-center">
                <Github className="h-5 w-5 mr-2" />
                Navigate to GitHub Repository
              </h3>
            </div>
            
            <div className="ml-11 space-y-3">
              <p className="text-gray-300 text-base leading-relaxed">
                First, you'll need to access our GitHub repository where all company data is stored.
              </p>
              
              <a
                href="https://github.com/AI-Boomi/ai-radar-companies"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-4 py-3 bg-gray-800/60 hover:bg-gray-700/60 rounded-lg border border-gray-600/40 hover:border-gray-500/60 text-white transition-all duration-200 group"
              >
                <Github className="h-4 w-4 group-hover:scale-110 transition-transform" />
                <span className="font-medium">Open GitHub Repository</span>
                <svg className="h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>

          {/* Step 2: Find and Edit JSON */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                2
              </div>
              <h3 className="text-xl font-semibold text-white flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Locate the Companies JSON File
              </h3>
            </div>
            
            <div className="ml-11 space-y-4">
              <p className="text-gray-300 text-base leading-relaxed">
                Navigate to the companies data file and add your company information.
              </p>
              
              <div className="bg-gray-800/40 rounded-lg p-4 border border-gray-700/40">
                <div className="text-sm text-gray-400 mb-2 font-mono">File path:</div>
                <div className="text-emerald-400 font-mono text-base bg-gray-900/60 px-3 py-2 rounded border border-gray-700/60">
                  companies.json
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-gray-300 text-sm">
                  <strong className="text-white">Instructions:</strong>
                </p>
                <ul className="text-gray-300 text-sm space-y-2 ml-4">
                  <li className="flex items-start space-x-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>Click on <code className="bg-gray-800 px-2 py-1 rounded text-emerald-400">companies.json</code></span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>Click the pencil icon (✏️) to edit the file</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>Add your company data at the end of the array (before the closing <code className="bg-gray-800 px-1 rounded text-emerald-400">]</code>)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Step 3: Company Data Template */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                3
              </div>
              <h3 className="text-xl font-semibold text-white">
                Add Your Company Data
              </h3>
            </div>
            
            <div className="ml-11 space-y-4">
              <p className="text-gray-300 text-base leading-relaxed">
                Copy and customize this template with your company information:
              </p>
              
              <div className="bg-gray-900/60 rounded-lg p-4 border border-gray-700/60 overflow-x-auto">
                <pre className="text-sm text-gray-300 whitespace-pre-wrap">
{`{
  "Name": "Your Company Name",
  "Founded": 2024,
  "Founders": "Founder Name 1, Founder Name 2",
  "Website": "https://yourcompany.com",
  "Category": "AI/ML, Machine Learning, SaaS",
  "Country": "India",
  "State": "Karnataka",
  "City": "Bangalore",
  "Logo": "https://your-logo-url.com/logo.png",
  "Description": "Brief description of what your company does...",
  "Linkedin Profile URL": "https://linkedin.com/company/yourcompany",
  "uuid": 123
}`}
                </pre>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
                <div className="flex items-start space-x-2">
                  <div className="w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">!</span>
                  </div>
                  <div className="text-amber-200 text-sm">
                    <strong>Important:</strong> Make sure to add a comma after the previous company entry and ensure your JSON is properly formatted.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 4: Submit Pull Request */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                4
              </div>
              <h3 className="text-xl font-semibold text-white flex items-center">
                <GitPullRequest className="h-5 w-5 mr-2" />
                Submit Your Pull Request
              </h3>
            </div>
            
            <div className="ml-11 space-y-4">
              <p className="text-gray-300 text-base leading-relaxed">
                Once you've added your company data, submit it for review.
              </p>
              
              <div className="space-y-3">
                <ul className="text-gray-300 text-sm space-y-2 ml-4">
                  <li className="flex items-start space-x-2">
                    <span className="text-purple-400 mt-1">•</span>
                    <span>Scroll down to "Commit changes" section</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-purple-400 mt-1">•</span>
                    <span>Add a commit message like: <code className="bg-gray-800 px-2 py-1 rounded text-purple-400">"Add [Your Company Name] to AI Radar"</code></span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-purple-400 mt-1">•</span>
                    <span>Select "Create a new branch for this commit and start a pull request"</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-purple-400 mt-1">•</span>
                    <span>Click "Propose changes"</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-purple-400 mt-1">•</span>
                    <span>Review your changes and click "Create pull request"</span>
                  </li>
                </ul>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4">
                <div className="flex items-start space-x-2">
                  <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                  <div className="text-emerald-200 text-sm">
                    <strong>That's it!</strong> Your pull request will be reviewed and merged, adding your company to the AI Radar.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Help Section */}
          <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40">
            <h4 className="text-lg font-semibold text-white mb-3">Need Help?</h4>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              If you're new to GitHub or need assistance, feel free to reach out or check GitHub's documentation on creating pull requests.
            </p>
            <a
              href="https://github.com/AI-Boomi/ai-radar-companies"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors text-sm"
            >
              <span>View Repository</span>
              <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCompanySidebar;