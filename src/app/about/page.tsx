import Image from "next/image";
import Header from "@/components/Header";

export default function About() {
  return (
    <>
      {/* Transparent header for about page */}
      <Header variant="transparent" />
      
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary to-white" />
        <div className="relative z-10 text-center px-8">
          <h1 className="hero-title mb-4">
            ABOUT US
          </h1>
          <p className="hero-subtitle">
            Excellence in Music Education
          </p>
        </div>
      </section>
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 lg:px-16 py-20">
      {/* Remove duplicate header as we now have hero section */}
      
      {/* Program Overview */}
      <section className="max-w-4xl mx-auto mb-16">
        <div className="prose prose-lg mx-auto text-gray-dark">
          <p className="text-lg leading-relaxed mb-6">
            The KMS Panther Band program has been a cornerstone of music education in our community 
            for over two decades. We believe that every student has the potential to excel in music, 
            and our program is designed to nurture that potential through comprehensive instruction, 
            engaging performances, and a supportive community.
          </p>
          <p className="text-lg leading-relaxed mb-6">
            Our curriculum covers a wide range of musical styles and techniques, from classical to 
            contemporary, ensuring that students receive a well-rounded musical education. Through 
            participation in the band program, students develop not only musical skills but also 
            discipline, teamwork, and confidence that will serve them throughout their lives.
          </p>
        </div>
      </section>

      {/* Directors Section */}
      <section id="directors" className="mb-16">
        <h2 className="text-3xl font-bold text-primary text-center mb-12">
          Meet Our Directors
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Director 1 - Boone */}
          <div className="bg-white overflow-hidden">
            <div className="aspect-square relative">
              <Image
                src="/images/boone-bio.png"
                alt="Dr. Bradley Boone - Head Band Director"
                fill
                className="object-contain"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Dr. Bradley Boone</h3>
              <p className="text-primary font-medium mb-3">Head Band Director</p>
              <p className="text-gray-dark mb-3">
                This is Dr. Boone&apos;s fourth year at C.E. King Middle School. He holds a Bachelor 
                of Music Education from Stetson University in Deland, Florida, as well as Master 
                of Music and Doctor of Musical Arts degrees from Louisiana State University. He is 
                a euphonium and trombone player.
              </p>
              <p className="text-gray-dark mb-3">
                Prior to joining the KMS Band, Dr. Boone taught at Bondy Intermediate and Shaw 
                Middle School in Pasadena ISD. Dr. Boone is also a veteran of the U.S. Army where 
                he served as a musician for nine years and traveled to over 25 countries.
              </p>
              <p className="text-gray-dark mb-3">
                His wife is a trumpet player and is the head band director at C.E. King High School.
              </p>
              <p className="text-gray-dark mb-3">
                Dr. Boone loves composing and arranging music, playing chess, movies, and reading.
              </p>
              <p className="text-gray-dark">
                <strong>Email:</strong> <a href="mailto:bradleyboone@sheldonisd.com" className="text-primary hover:underline">bradleyboone@sheldonisd.com</a>
              </p>
            </div>
          </div>

          {/* Director 2 - Ruiz */}
          <div className="bg-white overflow-hidden">
            <div className="aspect-square relative">
              <Image
                src="/images/ruiz-bio.jpg"
                alt="Assistant Band Director"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Ms. Catherine Ruiz</h3>
              <p className="text-primary font-medium mb-3">Assistant Band Director</p>
              <p className="text-gray-dark mb-3">
                My name is Catherine Ruiz and I am so excited to join the team at C.E. King 
                Middle School! I received my Music Education degree from Sam Houston State 
                University in 2020 and started my career on staff at MacArthur High School 
                in Aldine ISD.
              </p>
              <p className="text-gray-dark mb-3">
                This is going to be my 5th year of teaching in the Houston area and I am so 
                grateful for the privilege of getting to share my passion for music with my 
                students. Whenever I am not teaching, I enjoy staying active and exploring 
                what Houston has to offer.
              </p>
              <p className="text-gray-dark mb-3">
                I look forward to creating a vibrant and inspiring environment for our talented 
                students at C.E. King Middle School!
              </p>
              <p className="text-gray-dark">
                <strong>Email:</strong> <a href="mailto:catherineruiz@sheldonisd.com" className="text-primary hover:underline">catherineruiz@sheldonisd.com</a>
              </p>
            </div>
          </div>

          {/* Director 3 - Cooper (Placeholder) */}
          <div className="bg-white overflow-hidden">
            <div className="aspect-square relative bg-gray-light flex items-center justify-center">
              <div className="text-center">
                <svg className="w-32 h-32 mx-auto text-gray-dark" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
                <p className="text-gray-dark mt-2">Photo Coming Soon</p>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Ms. Jenny Cooper</h3>
              <p className="text-primary font-medium mb-3">Assistant Band Director</p>
              <p className="text-gray-dark mb-3">
                B.M. – Music Education; Tarleton State University
              </p>
              <p className="text-gray-dark mb-3">
                I was born in Germany and came over to the United States when I was 5. I spent 
                the majority of my life in the Western Texas area, which is very different from 
                Houston! If you were to ask my parents, they would tell you that I&apos;ve always 
                loved music. They knew after my 6th grade year of band that I would be pursuing 
                a career with music. At the end of that year my father gave me my very first 
                baton, which still travels with me everywhere I go.
              </p>
              <p className="text-gray-dark mb-3">
                As I continued in the band I took all the opportunities to play different 
                instruments and different music groups. This taught me how important my individual 
                musicianship, practice and consistency is to every group. I know how lucky I am 
                that my parents supported my love for music and for band. Music has been such a 
                wonderful experience and has enriched my life in ways I couldn&apos;t even imagine.
              </p>
              <p className="text-gray-dark mb-3">
                I have been able to travel the country, meet new musicians and composers, 
                performing, teaching and sharing my love for music. DCI has taken me to almost 
                all 50 states as performer and as a music educator. I am licensed to teach in 
                Wisconsin, Oklahoma and of course TEXAS!
              </p>
              <p className="text-gray-dark mb-3">
                <strong>Fun Facts:</strong> My high school is home to the oldest Marching Band in 
                the State of Texas! John Phillip Sousa was friends with the very first Director 
                of Bands – Prof. Bynum. Prof. Bynum&apos;s son, Mr. Bynum was a frequent substitute 
                teacher for my band classes in middle and high school as his second career.
              </p>
              <p className="text-gray-dark">
                <strong>Email:</strong> <a href="mailto:jennycooper@sheldonisd.com" className="text-primary hover:underline">jennycooper@sheldonisd.com</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Program Features */}
      <section className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-primary text-center mb-12">
          What Makes Our Program Special
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8">
            <h3 className="text-xl font-semibold mb-3 text-primary">Comprehensive Instruction</h3>
            <p className="text-gray-dark">
              We offer instruction in all concert band instruments including flute, clarinet, 
              saxophone, trumpet, trombone, percussion, and more. Students receive both 
              individual and ensemble instruction.
            </p>
          </div>
          
          <div className="p-8">
            <h3 className="text-xl font-semibold mb-3 text-primary">Performance Opportunities</h3>
            <p className="text-gray-dark">
              Students perform in multiple concerts throughout the year, participate in 
              regional competitions, and have opportunities to play at community events 
              and school functions.
            </p>
          </div>
          
          <div className="p-8">
            <h3 className="text-xl font-semibold mb-3 text-primary">Leadership Development</h3>
            <p className="text-gray-dark">
              Our program includes student leadership positions such as section leaders 
              and drum majors, helping students develop valuable leadership and 
              organizational skills.
            </p>
          </div>
          
          <div className="p-8">
            <h3 className="text-xl font-semibold mb-3 text-primary">Inclusive Community</h3>
            <p className="text-gray-dark">
              We pride ourselves on creating a welcoming environment where students of 
              all skill levels and backgrounds can thrive. The band is truly a family 
              where lasting friendships are formed.
            </p>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}