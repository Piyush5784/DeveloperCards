
import './App.css'

import { memo, useEffect, useState } from "react";
import { useInputs, BackendUrl, postData, getData } from "./Data.jsx";

function App() {

  const { name, description, linkedIn, twitter, interests } = useInputs();

  const [personData, setPersonData] = useState([]);

  async function showInputs() {
    let personName = name.current.value;
    let personDescription = description.current.value;
    let personLinkedInLink = linkedIn.current.value;
    let personTwitterLink = twitter.current.value;
    let personIntersts = interests.current.value;

    if (personName == "" || personDescription == "" || personLinkedInLink == "" || personTwitterLink == "" || personIntersts == "") {
      return alert("Enter all fileds");
    }
    else {
      const newPerson = {
        name: personName,
        description: personDescription,
        linkedIn: personLinkedInLink,
        twitter: personTwitterLink,
        interests: personIntersts.split(",")
      }
      const response = await postData(newPerson);
      // console.log(response)
      setPersonData(data => [...data, newPerson])
      name.current.value = ""
      description.current.value = ""
      linkedIn.current.value = ""
      twitter.current.value = ""
      interests.current.value = ""
    }
  }


  useEffect(() => {
    async function data() {
      const persons = await getData();
      setPersonData(persons)
    }
    data();
  }, [])

  return (
    <>
      <div className="flex container">

        <div className="inputs float-left p-2 mt-7 ml-5 w-auto sm:ml-0">
          <input ref={name} className="border-solid border-2 m-2 p-2 border-gray-600 " type="text" name="" id="" placeholder="Enter Name*" />
          <br />
          <br />
          <input ref={description} className="border-solid border-2 m-2 p-2 border-gray-600 " type="text" name="" id="" placeholder="Enter Description*" />
          <br />
          <br />
          <input ref={linkedIn} className="border-solid border-2 m-2 p-2 border-gray-600 " type="text" placeholder="LinkedIn Link*" />
          <br />
          <br />
          <input ref={twitter} className="border-solid border-2 m-2 p-2 border-gray-600 " type="text" placeholder="Twitter Link*" />
          <br /><br />

          <input ref={interests} className="border-solid border-2 m-2 p-2 border-gray-600 " type="text" placeholder="Interests*" />
          <br /><br />

          <button onClick={() => showInputs()} className="bg-[#007bff] hover:bg-blue-700 text-white font-bold  py-2 px-4 rounded ml-2">Show Card</button>

          <br />
        </div>

        <div>

          <div className="card float-right flex flex-wrap p-4">
            {personData.map((person) => <div key={person.name} className="sm:w/1-1 border-solid rounded border-2 m-2 p-5 container2 border-gray-100">
              <p className="name text-lg font-bold m-2">{person.name}</p>
              <p className="descriptin m-2" >{person.description}</p>
              <p className="m-2 text-lg font-bold">Interests</p>
              {person.interests.map(item => <div className="m-2">{item}</div>)}
              <div className="links mt-4 ml-2">
                <a href={person.linkedIn} target='_blank' className="bg-[#007bff] hover:bg-blue-700 text-white font-bold  py-2 px-4 rounded">LinkedIn</a>
                <a href={person.twitter} target='_blank' className="bg-[#007bff] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-3">Twitter</a>
              </div>
            </div>)}
          </div>
        </div>
      </div>

    </>
  )
}

export default memo(App);
