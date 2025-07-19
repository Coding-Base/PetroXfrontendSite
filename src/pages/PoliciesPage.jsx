import React from 'react';
import { FaShieldAlt, FaFileContract, FaUserCheck } from 'react-icons/fa';

const PoliciesPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="relative h-96 overflow-hidden bg-gradient-to-r from-gray-800 to-gray-900">
        <div className="absolute inset-0 bg-grid-white/5 bg-[length:40px_40px]"></div>
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">
            Policies & Agreements
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-gray-300">
            Understand how we protect your data and govern platform usage
          </p>
        </div>
      </header>

      {/* Content */}
      <section className="py-20 px-6 md:px-12">
        <div className="mx-auto max-w-4xl">
          <div className="prose prose-lg max-w-none">
            {/* Privacy Policy */}
            <div className="mb-20">
              <div className="mb-8 flex items-center">
                <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                  <FaShieldAlt className="text-xl" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800">Privacy Policy</h2>
              </div>
              
              <div className="rounded-xl border border-gray-200 bg-white p-8">
                <p className="mb-6 text-gray-700">
                  We value your privacy and are committed to keeping your data safe. This policy explains what information we collect, how we use it, and your choices.
                </p>
                
                <h3 className="mb-4 text-xl font-semibold text-gray-800">Information We Collect</h3>
                <p className="mb-6 text-gray-700">
                  When you create an account, we collect your login credentials (such as a username or email and password). We do not collect any other personal data from you. Additionally, any content you upload (past questions, course notes, etc.) is stored on our servers so the site can function. We also use cookies and Google Analytics to track general site usage (for example, which pages are most popular).
                </p>
                
                <h3 className="mb-4 text-xl font-semibold text-gray-800">How We Use Your Information</h3>
                <p className="mb-6 text-gray-700">
                  We use your login information solely to manage your account and provide the service. The content you upload is used to populate the site so that you and others can access it. Analytics data (from Google Analytics and similar tools) is used only in aggregate to improve the website and understand how users interact with it.
                </p>
                
                <h3 className="mb-4 text-xl font-semibold text-gray-800">Third-Party Services and Cookies</h3>
                <p className="mb-6 text-gray-700">
                  We may use third-party services like Google Analytics and Google AdSense. These services place cookies on your device and may collect information about your visits to our site. For example, Google's privacy requirements state that "you must notify users that your website uses Google Analytics" and include this in your privacy policy. Likewise, Google's AdSense program notes that third-party vendors (including Google) use cookies to serve ads based on users' prior visits to sites. Our site discloses this usage. Users can opt out of Google Analytics tracking by using Google's opt-out browser add-on or adjust their ad preferences via Google's Ads Settings.
                </p>
                
                <h3 className="mb-4 text-xl font-semibold text-gray-800">User-Provided Content</h3>
                <p className="mb-6 text-gray-700">
                  You retain ownership of all content you upload. By uploading material (such as past exam questions or notes), you grant us a license to store, display, and share that content as part of providing the service. We do not claim ownership of your uploads. However, we do not control and are not responsible for the user-generated content. We explicitly disclaim any liability for the accuracy, truthfulness, or reliability of any content uploaded by users. You are solely responsible for ensuring that you have the rights to share any material you upload (i.e. you are not infringing copyright or privacy laws).
                </p>
                
                <h3 className="mb-4 text-xl font-semibold text-gray-800">Data Sharing and Security</h3>
                <p className="mb-6 text-gray-700">
                  We do not sell or rent your personal information to third parties. We only share data with service providers (like Google Analytics) to help run the website. We use standard security practices to protect your account information, but we cannot guarantee complete security (since no system is perfectly secure).
                </p>
                
                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="text-gray-700">
                    We update this Privacy Policy as needed. By using this website, you agree to the practices described here. Please check back periodically for any changes.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Terms and Conditions */}
            <div>
              <div className="mb-8 flex items-center">
                <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                  <FaFileContract className="text-xl" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800">Terms and Conditions</h2>
              </div>
              
              <div className="rounded-xl border border-gray-200 bg-white p-8">
                <p className="mb-6 text-gray-700">
                  By accessing or using this website, you agree to the following terms. Please read them carefully:
                </p>
                
                <h3 className="mb-4 text-xl font-semibold text-gray-800">Acceptance of Terms</h3>
                <p className="mb-6 text-gray-700">
                  You must be at least 13 years old to use this site. By using the site, you warrant that you have read and agree to these terms. We reserve the right to change these terms at any time, and continued use of the site implies acceptance of any updates.
                </p>
                
                <h3 className="mb-4 text-xl font-semibold text-gray-800">User Accounts</h3>
                <p className="mb-6 text-gray-700">
                  You are responsible for keeping your account credentials secure and for all activities under your account. Provide accurate information when registering. We may suspend or terminate your account if you violate these terms.
                </p>
                
                <h3 className="mb-4 text-xl font-semibold text-gray-800">User Content</h3>
                <p className="mb-6 text-gray-700">
                  This site allows users to upload content (e.g. study materials, questions). You agree that any content you upload is your own or that you have permission to upload it. Do not post copyrighted material without authorization. By posting content, you grant us a non-exclusive license to display and distribute it on the site. You can remove your content at any time through your account settings. We are not obligated to monitor or endorse user content.
                </p>
                
                <h3 className="mb-4 text-xl font-semibold text-gray-800">Acceptable Conduct</h3>
                <p className="mb-6 text-gray-700">
                  You agree not to use the site for any illegal or harmful purpose. You must not upload content that is defamatory, obscene, hateful, infringing, or otherwise objectionable. Do not attempt to hack the site, impersonate others, or disrupt the site's functionality. Any such behavior can lead to immediate termination of your account.
                </p>
                
                <h3 className="mb-4 text-xl font-semibold text-gray-800">Disclaimers</h3>
                <p className="mb-6 text-gray-700">
                  All content on this site is provided "as is." We do <strong>not</strong> make any guarantees about the accuracy, completeness, or usefulness of any material. We explicitly disclaim liability for any user-generated content or any errors in the content. We also do not guarantee that the site will be available at all times or that it will be error-free. Use the site at your own risk.
                </p>
                
                <h3 className="mb-4 text-xl font-semibold text-gray-800">Limitation of Liability</h3>
                <p className="mb-6 text-gray-700">
                  To the fullest extent allowed by law, we are not liable for any damages arising from your use of the site. This includes any loss of data, loss of profits, or other damages related to the use or inability to use the service.
                </p>
                
                <h3 className="mb-4 text-xl font-semibold text-gray-800">Governing Law</h3>
                <p className="mb-6 text-gray-700">
                  These terms are governed by the laws of Nigeria (where we operate). Any dispute will be handled in the courts of Nigeria unless otherwise required by law.
                </p>
                
                <h3 className="mb-4 text-xl font-semibold text-gray-800">Contact</h3>
                <p className="mb-6 text-gray-700">
                  For any questions about these terms or the site, please contact us via email or contact form on the About page.
                </p>
                
                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="text-gray-700">
                    By using this website, you agree to all of the above terms. If you do not agree with these policies, please do not use the site.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PoliciesPage;