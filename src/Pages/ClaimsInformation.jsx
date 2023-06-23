import Cancel from "../assets/Icons/Cancel.svg";
import Status from "../Components/Status";

function ClaimsInformation() {
  return (
    <div>
      <div
        id="policy-info"
        className="flex justify-between items-center py-4 mb-8"
      >
        <div id="policy-number">
          <img src={Cancel} alt="cancel" />
          <div className="flex flex-col font-medium">
            <span className="text-[#333333] text-lg">123jkf5402</span>
            <span className="text-[#4F4F4F] text-sm">May 7, 2023</span>
          </div>
          <Status status="submitted" />
        </div>
        <div id="update-btn">
          <button onClick={handleStatusUpdate} className="bg-[#25D366] rounded">
            <div className="space-x-2 flex flex-row items-center px-4 py-2 text-white">
              <span className="text-base">Update Claim status</span>
            </div>
          </button>
        </div>
      </div>
      <div id="pry-info-sect" className="mx-auto max-w-6xl mt-12 px-6 lg:px-0">
        <div
          id="pry-info-container"
          className="flex justify-between items-center"
        >
          <div id="pry-info">
            <table>
              <thead>
                <th>Primary Information</th>
              </thead>
              <tbody>
                <tr>
                  <td>Policy number</td>
                  <td>123jkf5402</td>
                </tr>
                <tr>
                  <td>User email</td>
                  <td>fortunateanozie@gmail.com</td>
                </tr>
                <tr>
                  <td>Type of claim</td>
                  <td>Auto</td>
                </tr>
                <tr>
                  <td>Date</td>
                  <td>May 7, 2023</td>
                </tr>
                <tr>
                  <td>Insurer</td>
                  <td>AXA mansard</td>
                </tr>
                <tr>
                  <td>Bill estimate</td>
                  <td>₦50,000.00</td>
                </tr>
                <tr>
                  <td>Description</td>
                  <td>
                    While I was driving my car got hit by some mad keke-napep.
                    He rear-ended me and damaged my bumper.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div id="claim-image" className="border border-[#E0E0E0] rounded-sm">
          <p>Image</p>
          <div id="image container">
          
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClaimsInformation;
