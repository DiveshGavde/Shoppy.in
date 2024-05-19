import classes from "./MainContainer.module.css";

import BestSeller from "./BestSeller";
import StyleSuggestion from "./StyleSuggestion";
import Suggestion from "./suggestion";
import { TopDeals } from "./Deals";

export default function MainContainer() {
  return (
    <section className={classes.container}>
      <StyleSuggestion />
      <BestSeller />
      <Suggestion />
    </section>
  );
}
