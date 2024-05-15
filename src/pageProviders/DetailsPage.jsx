import * as authorities from "constants/authorities";
import DetailsPage from "pages/details";
import React from "react";

import PageAccessValidator from "./components/PageAccessValidator";
import PageContainer from "./components/PageContainer";

const DetailsPageContent = (props) => {
  return (
    <PageAccessValidator
      neededAuthorities={[authorities.ENABLE_SEE_SECRET_PAGE]}
    >
      <PageContainer>
        <DetailsPage {...props} />
      </PageContainer>
    </PageAccessValidator>
  );
};

export default DetailsPageContent;
