import { ButtonHTMLAttributes } from "react";

interface InviteButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  status:
    | "UNACCEPTED"
    | "PENDING"
    | "ACCEPTED"
    | "REJECTED"
    | "DECLINED"
    | "UNFRIEND"
    | "Accept"
    | "decline"
    | "remove";
}

export function InviteButton({
  isLoading,
  status,
  ...props
}: InviteButtonProps) {
  let buttonText = "";
  let buttonClasses = "";

  switch (status) {
    case "UNACCEPTED":
      buttonText = "+ Invite";
      buttonClasses = "bg-blue-500 text-white hover:bg-blue-900";
      break;
    case "PENDING":
      buttonText = "Pending";
      buttonClasses = "bg-yellow-50 text-yellow-600 hover:bg-yellow-100";
      break;
    case "Accept":
      buttonText = "Accept";
      buttonClasses = "bg-green-500 text-white hover:bg-green-700";
      break;
    case "decline":
      buttonText = "Decline";
      buttonClasses = "bg-red-500 text-white hover:bg-red-700";
      break;
    case "remove":
      buttonText = "Remove";
      buttonClasses = "bg-red-500 text-white hover:bg-red-700";
      break;
    case "REJECTED":
      buttonText = "Rejected";
      buttonClasses = "bg-gray-500 text-white cursor-not-allowed";
      break;

    case "UNFRIEND":
      buttonText = "Unfriend";
      buttonClasses = "bg-gray-200 text-gray-800 hover:bg-gray-300";
      break;
    default:
      buttonText = "+ Invite";
      buttonClasses = "bg-blue-500 text-white hover:bg-blue-900";
  }

  return (
    <button
      disabled={isLoading || ["PENDING", "REJECTED"].includes(status)}
      className={`px-2 text-xs md:text-base md:px-6 py-2 rounded-full font-medium transition-all duration-200 
        ${buttonClasses} ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
      {...props}
    >
      {isLoading ? "Processing..." : buttonText}
    </button>
  );
}
