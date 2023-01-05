import { useRouter } from "next/router";
import React from "react";

function Individual() {
  const params = useRouter();
  const { id } = params.query;
  return <div>
    
  </div>;
}

export default Individual;
