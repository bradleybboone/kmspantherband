import Image from 'next/image';
import Link from 'next/link';

/*
  Every link in the footer carries `inline-block py-3`: with text-sm's 20px
  line-height that is exactly a 44px tap target (WCAG target size), applied
  uniformly so new and old links stay visually consistent. List rhythm comes
  from the link padding, so the <ul>s have no space-y-*.
*/
export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            {/*
              The school logo's black panther and navy text are illegible on
              the navy footer, so it sits on a white chip (see the logo
              provenance note in the spec).
            */}
            <div className="mb-4 inline-block rounded-lg bg-white p-2">
              <Image
                src="/images/kms-school-logo.png"
                alt="C.E. King Middle School logo"
                width={80}
                height={80}
              />
            </div>
            <h3 className="text-lg font-display font-medium mb-4">KMS PANTHER BAND</h3>
            <p className="text-sm text-gray-lighter">Excellence in music education at</p>
            <a
              href="https://kms.sheldonisd.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block py-3 text-sm text-gray-lighter hover:text-white transition-colors"
            >
              C.E. King Middle School
            </a>
            <br />
            <a
              href="https://www.sheldonisd.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block py-3 text-sm text-gray-lighter hover:text-white transition-colors"
            >
              Sheldon ISD
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-display font-medium mb-4">QUICK LINKS</h3>
            <ul>
              <li>
                <Link href="/calendar" className="inline-block py-3 text-sm text-gray-lighter hover:text-white transition-colors">
                  Calendar
                </Link>
              </li>
              <li>
                <Link href="/handbook" className="inline-block py-3 text-sm text-gray-lighter hover:text-white transition-colors">
                  Handbook
                </Link>
              </li>
              <li>
                <Link href="/resources/forms" className="inline-block py-3 text-sm text-gray-lighter hover:text-white transition-colors">
                  Forms &amp; Documents
                </Link>
              </li>
              <li>
                <a
                  href="https://www.sheldonisd.com/departments/communications/parent-square"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block py-3 text-sm text-gray-lighter hover:text-white transition-colors"
                >
                  ParentSquare
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-display font-medium mb-4">CONTACT</h3>
            <ul className="space-y-1 text-sm text-gray-lighter">
              <li>C.E. King Middle School</li>
              <li>8540 C.E. King Parkway</li>
              <li>Houston, TX 77044</li>
              {/* No pt-2 on this li: the link's own py-3 already provides
                  the separation the old pt-2 gave, and stacking both would
                  make the phone number sit lower than the address block. */}
              <li>
                <a href="tel:+12817273500" className="inline-block py-3 hover:text-white transition-colors">
                  (281) 727-3500
                </a>
              </li>
            </ul>
          </div>

          {/* Future Members */}
          <div>
            <h3 className="text-lg font-display font-medium mb-4">NEW TO BAND?</h3>
            <p className="text-sm text-gray-lighter mb-2">
              Incoming students and families start here.
            </p>
            <Link href="/future-members" className="inline-block py-3 text-sm text-gray-lighter hover:text-white transition-colors underline">
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
