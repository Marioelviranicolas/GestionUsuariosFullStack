package seguridad.model;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Collection;
import java.util.List;
import java.util.Objects;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
@AllArgsConstructor @NoArgsConstructor @Data @Builder
@Entity
@Table(name="USUARIOS")
public class Usuario implements UserDetails, Serializable{
	
	private static final long serialVersionUID = 1L;
	
	@Id
	private String username;
	private String password;
	private String nombre;
	private String apellidos;
	private int enabled;
	@Column(name="FECHA_REGISTRO")
	private LocalDate fechaRegistro;
	@Column(name="FECHA_NACIMIENTO")
	private LocalDate fechaNacimiento;
	@ManyToOne
	@JoinColumn(name="id_perfil")
	private Perfil perfil;

	
	
	
	public Usuario() {
		super();
	}
	

	public Usuario(String username, String password, String nombre, String apellidos, int enabled,
			LocalDate fechaRegistro, LocalDate fechaNacimiento, Perfil perfil) {
		super();
		this.username = username;
		this.password = password;
		this.nombre = nombre;
		this.apellidos = apellidos;
		this.enabled = enabled;
		this.fechaRegistro = fechaRegistro;
		this.fechaNacimiento = fechaNacimiento;
		this.perfil = perfil;
	}

	public String getUsername() {
		return username;
	}


	public void setUsername(String username) {
		this.username = username;
	}


	public String getPassword() {
		return password;
	}


	public void setPassword(String password) {
		this.password = password;
	}


	public String getNombre() {
		return nombre;
	}


	public void setNombre(String nombre) {
		this.nombre = nombre;
	}


	public String getApellidos() {
		return apellidos;
	}


	public void setApellidos(String apellidos) {
		this.apellidos = apellidos;
	}


	public int getEnabled() {
		return enabled;
	}


	public void setEnabled(int enabled) {
		this.enabled = enabled;
	}


	public LocalDate getFechaRegistro() {
		return fechaRegistro;
	}


	public void setFechaRegistro(LocalDate fechaRegistro) {
		this.fechaRegistro = fechaRegistro;
	}


	public LocalDate getFechaNacimiento() {
		return fechaNacimiento;
	}


	public void setFechaNacimiento(LocalDate fechaNacimiento) {
		this.fechaNacimiento = fechaNacimiento;
	}


	public Perfil getPerfil() {
		return perfil;
	}


	public void setPerfil(Perfil perfil) {
		this.perfil = perfil;
	}
	
	


	@Override
	public String toString() {
		return "Usuario [username=" + username + ", password=" + password + ", nombre=" + nombre + ", apellidos="
				+ apellidos + ", enabled=" + enabled + ", fechaRegistro=" + fechaRegistro + ", fechaNacimiento="
				+ fechaNacimiento + ", perfil=" + perfil + "]";
	}


	@Override
	public int hashCode() {
		return Objects.hash(username);
	}


	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Usuario other = (Usuario) obj;
		return Objects.equals(username, other.username);
	}


	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		// Spring espera "ROLE_ADMIN", "ROLE_USER", etc.
        return List.of(new SimpleGrantedAuthority(perfil.getNombre()));
	}
	
	
	

}
