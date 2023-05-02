import React from 'react';

const Setting = () => {
  return (
    <div className="container mx-auto">
      <div>
        <div className="w-1/3 bg-white focus:outline-none">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-1 items-left">
            <div className="p-6 bg-gray rounded-lg shadow-lg" >
              <h6 className="text-2xl font-normal text-center mb-4">Adress</h6>
              <h6 className="text-2xl font-normal text-center mb-4">Phone</h6>
              <h6 className="text-2xl font-normal text-center mb-4">Password</h6>
            </div>
            </div>
            <div className="flex-1 bg-gray focus:outline-none">
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-5 items-right">
            <div className="p-8 bg-gray-100 rounded-lg shadow-lg">
              <form className="space-y-4">
                <div>
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="adress"
                  >
                    Adress
                  </label>
                  <input
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="adress"
                    type="text"
                  />
                </div>
                <div>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
          </div>
        </div>
      </div>
  )
}
export default Setting;