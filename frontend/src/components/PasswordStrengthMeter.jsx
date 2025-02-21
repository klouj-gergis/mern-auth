import { Check, X } from "lucide-react";


const PasswordCriteria = ({password}) => {
  const criteria = [
    { label: "At least 6 characters", met: password.length >= 6},
    { label: "Contains Uppercase letter", met: /[A-Z]/.test(password)},
    { label: "Contains Lowercase letter", met: /[a-z]/.test(password)},
    { label: "Contains a number", met: /\d/.test(password)},
    { label: "contains a special character", met: /[^A-Za-z0-9]/.test(password)},
  ];
  return(
    <div className="mt-2 space-y-1">
      {criteria.map((item) => (
        <div key={item.label} className="flex items-center text-xs">
          {item.met ? (
            <Check className="size-4 text-green-500 mr-2" />
          ):(
            <X className="size-4 text-gray-500 mr-2" />
          )
          }
          <span className={item.met ? 'text-green-500' : 'text-gray-400'}>{item.label}</span>
        </div>
      ))}
      
    </div>
  )
}

export default function PasswordStrengthMeter({password}) {
  const getStrength = (pass) => {
    let strength = 0;
    if (/[A-Z]/.test(pass)) strength++;
    if (/[a-z]/.test(pass)) strength++;
    if (/\d/.test(pass)) strength++;
    if (/[^A-Za-z0-9]/.test(pass)) strength++;
    if (pass.length >= 6) strength++;
    return strength;
  }

  const getStrengthText = (strength) => {
    if (strength === 0) return "Very Weak"
    if (strength === 1) return "Weak"
    if (strength === 2) return "Fair"
    if (strength === 3) return "Good"
    return "Strong"
  }

  const getColor = (strength) => {
    if (strength === 0) return "bg-red-500";
    if (strength === 1) return "bg-orange-500";
    if (strength === 2) return "bg-yellow-600";
    if (strength === 3) return "bg-yellow-300";
    return "bg-green-500";
  }

  const strength = getStrength(password)
  return (
    <div className="mt-2">
      <div className="flex justify-between mb-1">
        <span className="text-sm text-gray-400">Password strength</span>
        <span className="text-sm text-gray-400">{getStrengthText(strength)}</span>
      </div>
      <div className="flex space-x-1 mt-2">
        {[...Array(5)].map((_, index) => (
        <div 
          key={index}
          className={`h-1 w-1/4 rounded-full transition-colors duration-300 ${index < strength ? getColor(strength) : "bg-gray-600"}`}
        />)
      )

      }
      </div>
      <PasswordCriteria password={password}/>
    </div>
  )
}
