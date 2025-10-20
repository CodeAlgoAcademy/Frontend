import React from "react"
import { useDispatch } from "react-redux"
import { openErrorModal } from "store/fetchSlice"

interface RoleConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  confirmationData: {
    confirmation_token: string
    message: string
  }
  intendedRole: string
  onConfirm: (token: string) => Promise<void>
}

const RoleConfirmationModal: React.FC<RoleConfirmationModalProps> = ({
  isOpen,
  onClose,
  confirmationData,
  intendedRole,
  onConfirm,
}) => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = React.useState(false)

  const handleConfirm = async () => {
    setIsLoading(true)
    try {
      await onConfirm(confirmationData.confirmation_token)
    } catch (error) {
      dispatch(
        openErrorModal({
          errorText: ["Confirmation failed. Please try again."],
        }),
      )
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Add New Role</h3>

        <p className="text-gray-700 mb-6">{confirmationData.message}</p>

        <div className="flex flex-col space-y-3">
          <button
            onClick={handleConfirm}
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Adding Role..." : `Yes, Add ${intendedRole} Role`}
          </button>

          <button
            onClick={onClose}
            disabled={isLoading}
            className="w-full bg-gray-200 text-gray-800 py-3 px-4 rounded-xl font-semibold hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
        </div>

        <p className="text-xs text-gray-500 mt-4 text-center">This link will expire in 10 minutes</p>
      </div>
    </div>
  )
}

export default RoleConfirmationModal