import { appWithTranslation } from "next-i18next";
import Hero from "../component/Home";
 function page() {
  return (
   <main className=" overflow-hidden">
    <Hero/>
   </main>
  );
}

export default page