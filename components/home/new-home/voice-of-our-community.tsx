const data = [
   `
   <p>
   “CodeAlgo came to our middle school and made a tremendous impact on our future computer scientists. They were knowledgeable about their field and exhibited an enthusiasm for what they do that proved to be contagious. After the visit, I noticed a lot of students, who were not that interested in Computer Science, started to take the class more seriously. They also provided valuable insight on what it takes to enter the field, fresh out of high school. Their learning platform is inclusive to students from all backgrounds, and the game format allows students to learn at their own pace without feeling like they are doing work.”
   </p>

   
   <div>
   <p class="font-thabit"><b>Mikael Spears</b></p>
   <p class="font-thabit">Middle School Computer Science Teacher</p></div>
`,
   `
        <p>“The teachers were great, Sedric and Triumfia are awesome teachers.”</p>
        
        <div>
        <p class="font-thabit"><b>Turner Collins</b></p>
        <p class="font-thabit">Parent</p></div>
    `,
   `
        <p>“Great instruction, very well explained and instructors take the time to check in with kids that are falling behind and check their work.”</p>
        
        <div>
        <p class="font-thabit"><b>Elsa</b></p>
        <p class="font-thabit">Parent</p></div>
    `,
   `
        <p>“It exposed my son to some concepts he is very interested in. Honestly, it was a perfect environment to get him started.”</p>
        
       <div>
        <p class="font-thabit"><b>Nick Poffinbarger</b></p>
        <p class="font-thabit">Parent</p>
       </div>
    `,
   `
        <p>“The instructors were very helpful. They were very prompt in answering any questions.”</p>
        
        <div>
        <p class="font-thabit"><b>Solomon Maximillen</b></p>
        <p class="font-thabit">Parent</p></div>
    `,

   `
    <p>“As a parent, it is our responsibility to equip our children with the skills they need to succeed in the future. CodeAlgo provides an excellent platform for doing just that. The instructions were both easy to follow and challenging, making for an engaging learning experience. Watching my children proudly present the alarm system they built using the software was a joyous moment. I highly recommend CodeAlgo to other parents looking to give their children a competitive edge in today's world.”</p>
    
    <div>
    <p class="font-thabit"><b>Shapree’ Marshall</b></p>
    <p class="font-thabit">Parent</p>
    </div>
`,
   `
   <p> “He really enjoyed the freedom to build the obstacle course without hard time limits. I also enjoy the 4 top tables it allows for better social engagement for the kids. Great job. I wish his little brother could join. He is 6 years but he is very tech savvy with tablet and video game concepts.” </p>
   <br />
   <br />
 <div>  <p class="font-thabit"><b>Arlene Byrd</b></p>
   <p class="font-thabit">Parent</p></div>
`,
];

const VoiceOfOurCommunity = () => {
   return (
      <div className="mx-auto pb-10">
         <h1 className="mb-8 bg-[#0961D6] py-4 text-center font-tiltWarp text-[2.1rem] text-white max-md:text-[1.5rem]">
            THE VOICE OF OUR COMMUNITY
         </h1>

         <div className="no-scrollbar mx-auto mt-10 flex w-full gap-8 overflow-x-scroll px-6 pb-3 md:mt-20">
            {data.map((voice, index) => (
               <div
                  key={index}
                  className="small-scroll-thumb neutral-small-scroll-thumb flex h-[250px] min-w-[300px] max-w-[90vw] flex-col justify-between gap-6 overflow-y-scroll rounded-3xl  border border-black/30 bg-white p-6 !font-thabit text-[.9rem] shadow-lg max-md:p-4 md:min-w-[350px]"
               >
                  <div dangerouslySetInnerHTML={{ __html: voice }} className="flex h-full flex-col justify-between gap-y-2"></div>
               </div>
            ))}
         </div>
      </div>
   );
};

export default VoiceOfOurCommunity;
