import { db } from "../firebaseConfig";
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  query,
  where,
  updateDoc,
  deleteDoc,
  getDoc,
  orderBy,
  limit,
  count,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { doc } from "firebase/firestore";
const docRef = collection(db, "Projects");
const addNewProject = async (userID, projectTitle, projectType) => {
  let projectId = "";
  try {
    // Create a random projectId
    do {
      projectId = uuidv4();

      // Check if the projectId already exists
      const q = query(
        collection(db, "Projects"),
        where("projectId", "==", projectId)
      );
      var querySnapshot = await getDocs(q);
    } while (!querySnapshot.empty);

    // Add new project if projectId is unique
    await addDoc(collection(db, "Projects"), {
      projectId: projectId,
      name: projectTitle,
      content: "",
      type: projectType,
      userID: userID,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    console.log("Project added successfully!");
  } catch (error) {
    console.error("Error adding project:", error);
  }
};

const GetAllProjects = async (userID, limitPage = null) => {
  try {
    let q = query(
      docRef,
      where("userID", "==", userID),
      orderBy("createdAt"),
      limit(2)
    );
    if (limitPage == null) q = query(docRef, where("userID", "==", userID), orderBy("createdAt"));
    const querySnapshot = await getDocs(q);

    const projects = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log("Projects fetched successfully:");
    return projects;
  } catch (error) {
    console.error("Error getting projects:", error);
  }
};
const CountAllProjects =async (userID) => {
  try {
    const totalQuery = query(docRef, where("userID", "==", userID));
    const totalSnapshot = await getDocs(totalQuery);
    return totalSnapshot.size;
  } catch (error) {
    console.error("Error getting projects:", error);
  }
}
const GetProjectById = async (projectId) => {
  try {
    const projectRef = doc(db, "Projects", projectId);
    const projectSnap = await getDoc(projectRef);

    if (projectSnap.exists()) {
      const project = { id: projectSnap.id, ...projectSnap.data() };
      return project;
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error getting project:", error);
  }
};
const updateProject = async (projectId, updatedData) => {
  try {
    const projectRef = doc(db, "Projects", projectId);
    const docSnap = await getDoc(projectRef);
    if (!docSnap.exists()) {
      console.error("Document does not exist!");
      return;
    }

    await updateDoc(projectRef, {
      content: updatedData,
      updatedAt: serverTimestamp(),
    });
    console.log("Project updated successfully!");
  } catch (error) {
    console.error("Error updating project:", error);
  }
};

const deleteProject = async (projectId) => {
  try {
    await deleteDoc(doc(db, "Projects", projectId));
    console.log("Project deleted successfully!");
  } catch (error) {
    console.error("Error deleting project:", error);
  }
};

export {
  addNewProject,
  GetAllProjects,
  deleteProject,
  GetProjectById,
  updateProject,
  CountAllProjects
};
