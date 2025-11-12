package seguridad.service;

import java.util.List;

import seguridad.model.Rol;
import seguridad.model.Usuario;

public interface UsuarioService {
	
	Usuario findById(String username);
	Usuario findByUsernamePassword(String username, String password);
	List<Usuario> findAll();
	Usuario registrar(Usuario usuario);
	List<Usuario> findByPerfil(int idPerfil);

}
