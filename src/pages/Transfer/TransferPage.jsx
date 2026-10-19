import { useState } from "react";
import { useNavigate } from "react-router";
import FindPeople from "./FindPeople";
import PeopleInformation from "./PeopleInformation";
import TransferSummary from "./TransferSummary";

function TransferPage() {
  const navigate = useNavigate();
  const [contact, setContact] = useState(null);
  const [step, setStep] = useState("findPeople");
  const [amount, setAmount] = useState("");
  const [notes, setNotes] = useState("");
  const [result, setResult] = useState(null); 

  const handleSelectContact = (selected) => {
    setContact(selected);
    setStep("setNominal");
  };

  const handleSendAgain = () => {
    setContact(null);
    setAmount("");
    setNotes("");
    setResult(null);
    setStep("findPeople");
  };

  const handleBackDashboard = () => navigate("/dashboard");

  const handleTransferSuccess = (data) => setResult(data);

  const handleFinishSuccess = () => setStep("finish");

  return (
    <>
      {step === "findPeople" && (
        <FindPeople onSelectContact={handleSelectContact} />
      )}

      {step === "setNominal" && (
        <PeopleInformation
          contact={contact}
          amount={amount}
          setAmount={setAmount}
          notes={notes}
          setNotes={setNotes}
          onTransferSuccess={handleTransferSuccess}
          onFinishSuccess={handleFinishSuccess}
          onSendAgain={handleSendAgain}
          onBackDashboard={handleBackDashboard}
        />
      )}

      {step === "finish" && (
        <TransferSummary
          contact={contact}
          amount={amount}
          result={result}
          onSendAgain={handleSendAgain}
          onBackDashboard={handleBackDashboard}
        />
      )}
    </>
  );
}

export default TransferPage;