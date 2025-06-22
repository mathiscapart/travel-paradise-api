import { User } from "./models/user.model.js";

export const createDefautlAdmin = async () => {
  const email = "root@root.fr";
  const adminExist = await User.findOne({ where: { email } });

  if (adminExist) {
    return;
  }

  await User.create({
    lastName: "Admin",
    firstName: "defaut",
    country: "France",
    phone: "0102030405",
    email: email,
    password: "root",
    role: 80,
    language: "Français",
    avatar: "Admin.png",
    organisationId: null,
  });

  console.log("Utilisateur Admin Par défaut créer !")
}
