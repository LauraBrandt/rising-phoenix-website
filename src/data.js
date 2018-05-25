const data = {
  links: {
    facebook: "#",
    twitter: "#",
    goFundMe: "#"
  },
  home: {
    tagline: "Rebuilding the Robeson Planetarium and Science Center from the ashes.",
    blurbTitle: "The Loss of an Opportunity",
    /*make this max 1000 characters, or even 750*/
    blurb: `For more than 50 years, the Robeson Planetarium and Science Center has been teaching children of an underserved community about the wonders of science. But in 2016, the planetarium was destroyed in the wake of Hurricane Matthew. 
In a time when an understanding of science is so important, this is a blow for the community, which doesn"t have the resources to rebuild this community institution.
So we've decided to take matters into our own hands and rebuild the Robeson Planetarium and Science Center even better than before, once again giving a diverse range of students an opportunity to become the next generation of young scientists. 
But we need your help! Please click the link above to donate what you can, any amount is appreciated. `,
    goalAmount: 250000,
    donatedAmount: 5800,
    news: [
      {
        title: "The campaign begins",
        slug: "the-campaign-begins", // title 1. non-whitespace, non-number, non-digit removed, 2. whitespace replaced with "-", 3. all lowercase
        date: new Date("2018-1-8"),
        image: "",
        alt: "",
        article: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce faucibus nibh quis maximus convallis. Maecenas sit amet metus risus. Integer molestie sem eu urna vulputate varius. Fusce tempor erat et lacus tempor congue. Aliquam maximus, massa nec auctor efficitur, velit mauris luctus neque, nec feugiat sapien justo quis ex. In nec dapibus turpis, ut lacinia sem. Mauris at pulvinar risus. Aenean non diam orci. Fusce malesuada non augue sed molestie. Praesent diam urna, varius vitae augue nec, gravida aliquet ligula. Quisque gravida erat diam, ac semper massa semper nec. Duis sagittis tortor at sollicitudin posuere. Pellentesque non augue tempor, venenatis libero quis, placerat libero.
Fusce vel augue finibus felis rutrum cursus. Suspendisse dictum ultricies turpis, non blandit sem tincidunt a. Praesent euismod egestas nibh eu tincidunt. Fusce ullamcorper aliquet auctor. Duis venenatis odio augue, ac congue felis pellentesque in. Nunc lectus arcu, luctus a nulla eget, dictum vestibulum sem. Aliquam at viverra eros. Vestibulum malesuada pretium egestas. Nunc sit amet mauris sapien.
Proin ullamcorper posuere massa at iaculis. Donec diam dolor, laoreet sagittis posuere in, euismod a dui. Donec in augue ut massa lacinia vulputate. Pellentesque non est pellentesque, interdum nibh eget, mollis mauris. Curabitur tristique erat a metus ullamcorper euismod. Fusce nec efficitur lorem, rhoncus tempus nibh. Quisque scelerisque ipsum in elit facilisis, at vulputate lectus varius. Integer sagittis mi eu purus imperdiet imperdiet. Phasellus varius tempor ipsum, non pharetra ante faucibus eget. Duis sed sem sed est interdum consectetur. Donec eu nulla a enim malesuada gravida ut eget est. Duis rhoncus aliquam sagittis. Maecenas eget nibh id tortor pharetra pellentesque. Integer sed rutrum mi. Vivamus gravida massa quis magna varius, eget tincidunt tellus mattis.`,
      },
      {
        title: "Next committee meeting",
        slug: "next-committee-meeting",
        date: new Date("2018-1-2"),
        image: "nextmeeting.jpg",
        alt: "box with text 'Put this on your calendar'",
        article: `Pellentesque tincidunt justo massa, bibendum fermentum erat faucibus tempus. Aliquam pretium, mauris vulputate ultrices gravida, nibh ipsum finibus urna, vehicula ultricies metus ligula ornare purus. Nunc lorem neque, hendrerit vel lectus eget, maximus ornare sem. Fusce dictum metus nunc, cursus commodo nunc ultrices vitae. Nullam sodales sapien eget iaculis accumsan. Aliquam urna sapien, laoreet eu pellentesque pharetra, interdum nec justo. Integer commodo, justo in varius tincidunt, mi eros pretium odio, quis mattis lacus dui ut est. Integer fermentum efficitur sem id mollis. Mauris at faucibus turpis. Cras ac ante ut velit pharetra euismod. Suspendisse vulputate non magna et lobortis. Nunc ac dolor malesuada, tincidunt massa tempor, lobortis risus.
Ut mollis auctor nisi id scelerisque. Sed turpis lorem, lacinia non mollis eget, aliquam non felis. Integer ante erat, mollis id lorem ac, consequat viverra dui. Sed ipsum elit, varius vel ligula eu, commodo gravida odio. Sed vitae magna ac odio condimentum semper id sit amet arcu. Nam et vestibulum ligula. Vivamus arcu neque, fringilla et augue at, ultrices tincidunt est. Phasellus a pretium nulla. Ut nunc lectus, sagittis sed tellus sed, vulputate cursus nunc. Fusce vulputate augue sed eros auctor lobortis. Nam erat enim, maximus sed justo porttitor, eleifend finibus lectus. Pellentesque tempus porttitor eros, a eleifend sapien molestie vel. Nunc ut turpis elementum, dapibus sapien vitae, luctus sapien. Mauris tempus ac neque nec efficitur.`,
      },
      {
        title: "Third article",
        slug: "third-article",
        date: new Date("2018-1-2"),
        image: "stock-image.jpg",
        alt: "profile of golden retriever dog yawning",
        article: `Pellentesque tincidunt justo massa, bibendum fermentum erat faucibus tempus. Aliquam pretium, mauris vulputate ultrices gravida, nibh ipsum finibus urna, vehicula ultricies metus ligula ornare purus. Nunc lorem neque, hendrerit vel lectus eget, maximus ornare sem. Fusce dictum metus nunc, cursus commodo nunc ultrices vitae. Nullam sodales sapien eget iaculis accumsan. Aliquam urna sapien, laoreet eu pellentesque pharetra, interdum nec justo. Integer commodo, justo in varius tincidunt, mi eros pretium odio, quis mattis lacus dui ut est. Integer fermentum efficitur sem id mollis. Mauris at faucibus turpis. Cras ac ante ut velit pharetra euismod. Suspendisse vulputate non magna et lobortis. Nunc ac dolor malesuada, tincidunt massa tempor, lobortis risus.
Ut mollis auctor nisi id scelerisque. Sed turpis lorem, lacinia non mollis eget, aliquam non felis. Integer ante erat, mollis id lorem ac, consequat viverra dui. Sed ipsum elit, varius vel ligula eu, commodo gravida odio. Sed vitae magna ac odio condimentum semper id sit amet arcu. Nam et vestibulum ligula. Vivamus arcu neque, fringilla et augue at, ultrices tincidunt est. Phasellus a pretium nulla. Ut nunc lectus, sagittis sed tellus sed, vulputate cursus nunc. Fusce vulputate augue sed eros auctor lobortis. Nam erat enim, maximus sed justo porttitor, eleifend finibus lectus. Pellentesque tempus porttitor eros, a eleifend sapien molestie vel. Nunc ut turpis elementum, dapibus sapien vitae, luctus sapien. Mauris tempus ac neque nec efficitur.`,
      },
    ]        
  },
  about: {
    text: `<p>I am reaching out to you because (different reasons:  as a citizen of Robeson County, you know how special the Planetarium and Science Center is; because you know first-hand how important science, and particularly astronomy is to the citizens of Earth, etc.  We’ll have a couple of general ones for the lower amounts and individualized for the people we hope will give lots).</p>
    <p>On October 8, 2016, Hurricane Matthew devastated Robeson County, NC.  Homes, businesses, and schools were destroyed.  More than a year later, many people are still displaced and the scars are still evident everywhere.  The Public Schools of Robeson County have opened most of their schools, but there is one that has been condemned and will never reopen.  The administrative offices are housed in temporary quarters, and an icon of the county, the Robeson Planetarium and Science Center, is unusable.</p>
    <p>Robeson County has a unique population:  24% African American, 9% Hispanic, and 41% Native American.  The per capita income is approximately $15,000, and 31% of the citizens live in poverty.  The average household income is only around $30,000, and the opportunities for extracurricular activities for the students are minimal.</p>
    <p>The Robeson Planetarium and Science Center has worked for almost 50 years to open the eyes of these impoverished children to the wonders of science in the universe.  Hosting 8,000 school children a year, the Robeson Planetarium and Science Center is free to all families in the area.  As a part of of the Public Schools of Robeson County system, students at several grade levels visit annually.  Many adults talk fondly of their trips to the Planetarium when they were kids.  Astronauts Bill McArthur and Curtis Brown,  Oscar Matthews, Dan Carey, and Leila Zucker, three of the Mars One Candidates, and Bill Nye the Science Guy are just some of the people who have helped to introduce students of all ages to the fantastic vision of the night sky and the excitement of space exploration.</p>
    <p>In addition to showing off the heavens to the school children, the Robeson Planetarium and Science Center has allowed students to find and keep some of the natural wonders of our state.  North Carolina has a greater variety of minerals than any other state.  The mirror of the Hubble Telescope is made of North Carolina quartz because of the incredible quality of the quartz (and other minerals) here.  After students find a selection of minerals in the flume, students used their knowledge to identify the minerals found.  Then the students kept the minerals (quartz, garnet, emerald, petrified wood, and more) that they have found.  The planetarium has given away minerals worth over $10,000 so far.</p>
    <p>We’d like to count on you to help us rebuild this unique facility for deserving students. Would you consider donating to the rebuilding of the Robeson County Planetarium and Science Center.  Would you share this appeal with others?  We will gladly accept any donations.  Please make any checks out to the Rising Phoenix, which is the advisory board for the Robeson Planetarium and Science Center (501C3 status pending).  Our mailing address is ___.  Or you may contribute to our Go Fund Me account at ___.</p>`,
  },
  committee: {
    members: [
      {name: "John Allen", organization: "PSRC, Early College HS"},
      {name: "Tim Barry", organization: "IPS Facilities and Design Committee (Architect)"},
      {name: "Ken Brandt", organization: "Robeson Planetarium"},
      {name: "Lorrie Brandt", organization: "Concerned citizen"},
      {name: "Laura Brandt", organization: "Concerned citizen"},
      {name: "Traci Bullard", organization: "SERMC", link: "http://www.navsea.navy.mil/Home/RMC/SERMC/"},
      {name: "Angelica Chavis-McIntyre", organization: "Ass't. District Attorney"},
      {name: "Shea Ann DeJarnette", organization: "Robeson County 4H", link: "https://robeson.ces.ncsu.edu/"},
      {name: "Tim Dippel", organization: "Chive On Fayetteville", link: "https://www.facebook.com/ChiveOnFayetteville/"},
      {name: "Jose D'Arruda", organization: "Arts & Sciences, UNCP", link: "http://www.uncp.edu/academics/colleges-schools-departments/colleges-schools/college-arts-and-sciences"},
      {name: "Sandra Evans", organization: "PSRC", link: "https://www.robeson.k12.nc.us/"},
      {name: "David Gavasci", organization: "RCC", link: "https://www.robeson.edu/"},
      {name: "Johnny Hunt", organization: "Former Superintendent, PSRC"},
      {name: "Joy Ivey", organization: "Fairmont Civitan"},
      {name: "Tim Little", organization: "RCPfC, Kiwanis"},
      {name: "Gary Mauk", organization: "College of Education, UNCP", link: "http://www.uncp.edu/academics/colleges-schools-departments/colleges-schools/school-education"},
      {name: "Mark Moses", organization: "Robeson Journal", link: "http://www.therobesonjournal.net/"},
      {name: "Matthew Perkins", organization: "Former Director, Robeson Planetarium"},
      {name: "Angela Sumner", organization: "LAVB"},
      {name: "Ken Yager", organization: "Seiler Instruments/NC Museum Collaborative"},
    ]
  },
  sponsors: {
    individual: {
      title: "Thanks to all the people who have supported us!",
      names: [
        // {name: "Suanne Hagerty"},
        // {name: "Vonda Redding"},
        // {name: "Alicia Hosler"},
        // {name: "Theola Sloat"},
        // {name: "Lovie Digby"},
        // {name: "Veronique Collingsworth"},
        // {name: "Esmeralda Bergstrom"},
        // {name: "Clifford Blanche"},
        // {name: "Genna Minger"},
        // {name: "Willard Edlin"},
        // {name: "Evita Redfield"},
        // {name: "Isaac Sarris"},
        // {name: "Ludivina Rusch"},
        // {name: "Melania Ortego"},
        {name: "Lelia Campfield"},
        {name: "Chaya Timmins"},
        {name: "Richie Laubach"},
        {name: "Grazyna Tallant"},
        {name: "Delfina Clevinger"},
        {name: "Dann Bentley"},
        {name: "Minna Duty"},
        {name: "Shawnee Gassett"},
        {name: "Grace Mahabir"},
        {name: "Christina Pooley"},
        {name: "Christine Lough"},
        {name: "Lauretta Tostado"},
        {name: "Mitsuko Krok"},
        {name: "Chrystal Courtney"},
        {name: "Deloris Jaimes"},
        {name: "Roxanna Knobel"},
        {name: "Mana Telesco"},
        {name: "Veta Shellenbarger"},
        {name: "Luanna Jacinto"},
        {name: "Glendora Gupton"},
        // {name: "Karole Sleeman"},
        // {name: "Karlene Salvas"},
        // {name: "Blanch Harpole"},
        // {name: "Stephnie Mcconville"},
        // {name: "Jesse Bittner"},
        // {name: "Lakesha Biggins"},
        // {name: "Naida Lentini"},
        // {name: "Wava Bolger"},
        // {name: "Renae Wayland"},
        // {name: "Waylon Shy"},
        // {name: "Aline Mastroianni"},
        // {name: "Illa Wiese"},
        // {name: "Larisa Lasseter"},
        // {name: "Jocelyn Waring"},
        // {name: "Chelsea Vara"},
        // {name: "Denise Maultsby"},
      ],
    },
    corporate: {
      title: "Thanks to all the businesses who have supported us!",
      businesses: [
        {name: "Mariani's Venue", logo: "marianisvenue-logo.png", link: "https://www.marianivenue.com/"},
        {name: "Thai Chili", logo: "thaichili.jpg", link: "http://www.thethaiplace.com/"},
        {name: "Robeson Community College", logo: "rcclogo.png", link: "https://www.robeson.edu/"},
        {name: "Carolina Rental Properties", logo: "", link: ""}, //
        {name: "Mobile Meat Market", logo: "mobile_meat_market.jpg", link: ""}, //
        {name: "American Plush Textile Mills, LLC", logo: "american-plush-textile-mills.jpg", link: "http://www.americanplush.com/"},
        {name: "TerraStar Energy", logo: "terrastarenergylogo.jpg", link: "http://www.terrastarenergy.com/"},
        {name: "All Occasions & Bridal", logo: "", link: "https://www.facebook.com/ALLOCCASIONSANDBRIDAL/"}, //
        {name: "Top Assignment Service", logo: "topassignmentlogo.png", link: "http://www.topassignmentservice.com/"},
        {name: "Discount Wholesalers", logo: "dwi_logo-new.jpg", link: "http://www.discountwholesalersinc.com/"},
        {name: "Crumley Roberts Attorneys at Law", logo: "lawyerlogo.png", link: "https://www.crumleyroberts.com/"},
        // {name: "", logo: "", link: ""},
      ],
    }
  },
  calendar: {
    events: [
      {dateTime: new Date("1/8/2017 18:00:00"), name: "Committee Meeting", location: "Location TBD", description: "", minutesLink: "https://docs.google.com/document/d/143V8XUlBAsFi54jMJEuIGgc0ThAIKIx8OdJpKEm7lN8/edit?ts=5a20e5af"},
      {dateTime: new Date("3/17/2017 11:30:00"), name: "Bake Sale", location: "Lumberton High School Auditorium", description: "Come join us for fun and goodies!", minutesLink: ""},
      // {dateTime: "", name: "", location: "", description: "", minutesLink: ""},
    ]
  },
  donate: {
    donateTitle: "Make a Donation",
    donateText: "We appreciate your help! We're grateful for any amount you are able to give.",
    rewardTitle: "Get a Reward",
    rewardText: "We want to say thanks! Below is a list of donor levels. All donors will be listed on our website.  All donations over $1,000 will be on our donor wall.  How would you like your name listed?",
    check: {
      to: "Rising Phoenix",
      name: "Lorrie Brandt",
      address1: "1234 Main St",
      address2: "",
      city: "Lumberton",
      state: "NC",
      zip: "12345"
    },
    rewardLevels: [
      {
        amountStart: 1,
        amountEnd: 49,
        name: "Satellite",
        reward: "Your name on our website"
      },
      {
        amountStart: 50,
        amountEnd: 99,
        name: "Aurora Borealis",
        reward: "Your name on the plaque in our picnic area"
      },
      {
        amountStart: 100,
        amountEnd: 499,
        name: "Lunar Explorer",
        reward: "Your name plate on a table in our picnic area"
      },
      {
        amountStart: 500,
        amountEnd: 999,
        name: "Meteor Monitor",
        reward: "Your name plate on a bench in our picnic area"
      },
      {
        amountStart: 1000,
        amountEnd: 4999,
        name: "Asteroid Miner",
        reward: "Your name plate on a seat in our picnic area"
      },
      {
        amountStart: 5000,
        amountEnd: 9999,
        name: "Comet Trailblazer",
        reward: "Your name on our planet walkway"
      },
      {
        amountStart: 10000,
        amountEnd: 49999,
        name: "Planet Pioneer",
        reward: "Your name plate on a seat in the Planetarium"
      },
      {
        amountStart: 50000,
        amountEnd: 99999,
        name: "Star Traveller",
        reward: "Your name plate on the base of the Star Projector in the center of the Planetarium"
      },
      {
        amountStart: 100000,
        amountEnd: 249999,
        name: "Constellation Rover",
        reward: "Your name plate on the flume in the Science Center"
      },
      {
        amountStart: 250000,
        amountEnd: 499999,
        name: "Milky Way Voyager",
        reward: "Your name over the door of the Science Center"
      },
      {
        amountStart: 500000,
        amountEnd: 999999,
        name: "Intergalactic Jetsetter",
        reward: ""
      },
      {
        amountStart: 1000000,
        amountEnd: "",
        name: "Galactic Phoenix",
        reward: "Naming rights to the Planetarium OR to the Science Center*"
      }
    ]
  },
  bylaws: {
    contentHTML: `<article>
    <h1>Robeson Planetarium Rising Phoenix Board</h1>
    <p><br></p>
    <h1>Constitution</h1>
    <p><br></p>
    <h2>Article I: &nbsp;Name &amp; Purpose</h2>
    <h3>Section A: &nbsp;Name:</h3>
    <p>The name of this organization shall be the Robeson Planetarium Rising Phoenix Board and shall be referred to as the “Board” in this document.</p>
    <h3>Section B: &nbsp;Purpose</h3>
    <p>The purpose of this organization shall be: &nbsp;</p>
    <ol>
      <li>To raise funds for the re-building and long-term support of the Robeson Planetarium and STEAM Center (known henceforth as the “Planetarium”) through fundraising events and long-term patronage. &nbsp;</li>
      <li>Adhere to the guidelines set forth by the Public Schools of Robeson County</li>
    </ol>
    <p><br></p>
    <h2>Article II: &nbsp;Board Membership&nbsp;</h2>
    <h3>Section A: &nbsp;Eligibility: &nbsp;</h3>
    <p>Membership shall be open to any individual, group, association, organization, business or corporation representative who are brought before and approved by the members of the current board.</p>
    <p><br></p>
    <h2>Article III: &nbsp;Officers</h2>
    <h3>Section A: &nbsp;The Executive Committee:</h3>
    <p>The Executive Committee shall consist of the President, Past President, Vice-President, Secretary, Treasurer, Treasurer-Elect, and Liaison to the School Board. &nbsp;</p>
    <h3>Section B: &nbsp;Rotation:</h3>
    <p>Officers shall be elected each year with the President moving into the Past President’s position and the Treasurer-elect moving into the Treasurer’s position.</p>
    <p><br></p>
    <h2>Article IV: &nbsp;Meetings</h2>
    <p>There will be a minimum of four (4) meetings per year, one of which is the annual meeting. &nbsp;More meetings may be called by the President as needed.&nbsp;</p>
    <p><br></p>
    <h2>Article V: &nbsp;Quorum</h2>
    <p>In order for any business to be conducted, a quorum of at least two-thirds (2/3) of the executive committee is necessary. &nbsp;</p>
    <p><br></p>
    <h2>Article VI: &nbsp;Ratification and Amendments&nbsp;</h2>
    <h3>Section A: &nbsp;Ratification: &nbsp;</h3>
    <p>Ratification of this constitution and bylaws may be accomplished by a two-thirds (2/3) affirmative vote of members present and voting during the business session of the general membership meeting.&nbsp;</p>
    <h3>Section B: &nbsp;Bylaws:</h3>
    <p>Bylaws may not be in conflict with the constitution.</p>
    <h3>Section C: &nbsp;Notice: &nbsp;</h3>
    <p>The constitution and bylaws may be amended by a two-thirds (2/3) affirmative vote of the members present and voting at the business meeting provided that the proposed change is sent, in writing, to the membership at least five days before the meeting. &nbsp;</p>
    <p><br></p>
    <p><br></p>
    <h1>By-Laws&nbsp;</h1>
    <h2>I. General: &nbsp;</h2>
    <p>The rules contained in Robert’s Rules of Order, latest edition, shall govern the business meetings of this board. &nbsp;</p>
    <p><br></p>
    <h2>II. Nomination of Officers: &nbsp;</h2>
    <ol>
      <li>Nominations of candidates for the Board will take place from the floor at the annual meeting. &nbsp;All nomationations will be finalized during this process.</li>
      <li>The campaigning will be restricted to statements made at this meeting prior to ballots being cast.</li>
      <li>The officers shall be elected by ballot from nominated Board members during the annual meeting. &nbsp;A two-thirds (2/3) vote of the total membership present is required for election.</li>
      <li>The term of office will be for one year with the exception of the President, who will succeed the Past President, who will then serve in an advisory (non-voting) capacity, and the Treasurer-elect, who will succeed the Treasurer.</li>
      <li>Vacancy: &nbsp;If a vacancy occurs in the office of President, the Vice-President shall assume the office for the remainder of the term. &nbsp;Vacancies in any other office shall be filled by a special election. &nbsp;</li>
    </ol>
    <p><br></p>
    <h2>III. &nbsp;Duties of Officers&nbsp;</h2>
    <h3>&nbsp;&nbsp;&nbsp;&nbsp;A: &nbsp;President: &nbsp;</h3>
    <p>It shall be the duty of the President to:&nbsp;</p>
    <ul>
      <li>Preside at meetings;&nbsp;</li>
      <li>Vote only in the case of a tie;&nbsp;</li>
      <li>Represent the Board at public events;&nbsp;</li>
      <li>Appoint committee chairpersons subject to the approval of the Executive Committee;&nbsp;</li>
      <li>Serve as an ex-officio member of all committees except the nominating committee. &nbsp;</li>
    </ul>
    <h3>&nbsp;&nbsp;&nbsp;&nbsp;B: Past President&nbsp;</h3>
    <p>It shall be the duty of the Past President to:&nbsp;</p>
    <ul>
      <li>Serve in an advisory capacity to the President and Executive Committee.</li>
    </ul>
    <h3>&nbsp;&nbsp;&nbsp;&nbsp;C: &nbsp;Vice-President: &nbsp;</h3>
    <p>It shall be the duty of the Vice-President to:&nbsp;</p>
    <ul>
      <li>Preside in the absence of the President;&nbsp;</li>
      <li>Serve as chairperson of the Fundraising Committee;&nbsp;</li>
      <li>Serve as the Public Information Officer. &nbsp;&nbsp;</li>
    </ul>
    <h3>&nbsp;&nbsp;&nbsp;&nbsp;D: &nbsp;Secretary: &nbsp;</h3>
    <p>It shall be the duty of the Secretary to:&nbsp;</p>
    <ul>
      <li>Record the minutes of all meetings;&nbsp;</li>
      <li>Keep a file of the Board’s records and publish them in a timely manner;&nbsp;</li>
      <li>Maintain a current roster of membership;&nbsp;</li>
      <li>Issue notices of meetings and conduct the general correspondence of the Board.&nbsp;</li>
    </ul>
    <h3>&nbsp;&nbsp;&nbsp;&nbsp;E: &nbsp;Treasurer: &nbsp;</h3>
    <p>It shall be the duty of the Treasurer to:&nbsp;</p>
    <ul>
      <li>Serve on the Fundraising Committee;&nbsp;</li>
      <li>Receive all funds and process Request for Payment, Deposit Slip, and Officer Signature forms; &nbsp;</li>
      <li>Keep an itemized account of all receipts and expenditures and make reports as directed;&nbsp;</li>
      <li>File the annual tax return for the Board. &nbsp;</li>
    </ul>
    <h3>&nbsp;&nbsp;&nbsp;&nbsp;F: &nbsp;Treasurer-Elect: &nbsp;</h3>
    <p>It shall be the duty of the Treasurer-Elect to:&nbsp;</p>
    <ul>
      <li>Serve as a back-up to the Treasurer in all duties. &nbsp;</li>
    </ul>
    <h3>&nbsp;&nbsp;&nbsp;&nbsp;G: &nbsp;Liaison to the School Board: &nbsp;</h3>
    <p>It shall be the duty of the Liaison to the School Board to:&nbsp;</p>
    <ul>
      <li>Chair the public relations committee;</li>
      <li>Communicate with the Robeson Planetarium Rising Phoenix Board and the School Board of Robeson County in a positive manner;</li>
      <li>Attend school board meetings as necessary. &nbsp;</li>
    </ul>
    <p><br></p>
    <h2>IV. &nbsp;Duties of Advisor&nbsp;</h2>
    <h3>&nbsp;&nbsp;&nbsp;&nbsp;A: &nbsp;Selection: &nbsp;</h3>
    <p>The Director of the Robeson County Planetarium and STEAM Center shall serve as an advisor to the Board.&nbsp;</p>
    <h3>&nbsp;&nbsp;&nbsp;&nbsp;B: &nbsp;Duties: &nbsp;</h3>
    <p>The responsibilities of the Advisor shall be to:&nbsp;</p>
    <ul>
      <li>Attend regular meetings and executive board meetings as often as possible;&nbsp;</li>
      <li>Assist in the orientation of new officers;&nbsp;</li>
      <li>Communicate the needs and activities of the Planetarium and STEAM Center to the Board&nbsp;</li>
    </ul>
    <p><br></p>
    <h2>V. &nbsp;Committees&nbsp;</h2>
    <h3>A: &nbsp;Executive Committee: &nbsp;</h3>
    <p>The Executive Committee shall consist of all officers of the Board &nbsp;&nbsp;</p>
    <h3>B: &nbsp;Public Relations Committee: &nbsp;</h3>
    <p>A public relations committee shall be composed of the Liaison to the School Board, the Advisor, and at least three (3) other Board members to keep the Planetarium in the spotlight. &nbsp;</p>
    <h3>C: &nbsp;Fund-Raising Committee: &nbsp;</h3>
    <p>A fundraising committee shall be composed of the Vice-President, the Treasurer, and at least three (3) other Board members. &nbsp;Their initial purpose shall be to raise money to rebuild the Planetarium. &nbsp;Once the doors have reopened, the purpose shall be to raise money to fund any necessary supplies not covered by the Public Schools of Robeson County. &nbsp;</p>
    <h3>D: &nbsp;Other committees:&nbsp;</h3>
    <p>Other committees shall be appointed by the President, with the approval of the Executive Committee, as needed. &nbsp;These committees may serve in perpetuity or may be for a specific, short-term purpose. &nbsp;</p>
    <p><br></p>
    <h2>VI. &nbsp;Attendance: &nbsp;</h2>
    <p>Attendance may be in person (which is preferable) or virtual (if necessary).&nbsp;</p></article>`
  }
};

export default data;