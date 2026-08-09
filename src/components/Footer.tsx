import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-display font-medium mb-4 text-white !text-white">KMS PANTHER BAND</h3>
            <p className="text-sm text-gray-lighter">
              Excellence in music education at <br />
              <a href="https://kms.sheldonisd.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                C.E. King Middle School
              </a>
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-display font-medium mb-4 text-white !text-white">QUICK LINKS</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/calendar" className="text-sm text-gray-lighter hover:text-white transition-colors">
                  Calendar
                </Link>
              </li>
              <li>
                <Link href="/handbook" className="text-sm text-gray-lighter hover:text-white transition-colors">
                  Handbook
                </Link>
              </li>
              <li>
                <Link href="/join" className="text-sm text-gray-lighter hover:text-white transition-colors">
                  Join Band
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-display font-medium mb-4 text-white !text-white">CONTACT</h3>
            <ul className="space-y-1 text-sm text-gray-lighter">
              <li>C.E. King Middle School</li>
              <li>8540 C.E. King Parkway</li>
              <li>Houston, TX 77044</li>
              <li className="pt-2">
                <a href="tel:+12817273500" className="hover:text-white transition-colors">
                  (281) 727-3500
                </a>
              </li>
            </ul>
          </div>

          {/* Future Members */}
          <div>
            <h3 className="text-lg font-display font-medium mb-4 text-white !text-white">NEW TO BAND?</h3>
            <p className="text-sm text-gray-lighter mb-2">
              Incoming students and families start here.
            </p>
            <Link href="/future-members" className="text-sm text-gray-lighter hover:text-white transition-colors underline">
              Future Panthers &rarr;
            </Link>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/20">
          <p className="text-sm text-gray-lighter text-center">
            © {new Date().getFullYear()} KMS Panther Band. All rights reserved. | Excellence From Within
          </p>
        </div>
      </div>
    </footer>
  );
}