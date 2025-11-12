package seguridad.model;

import java.io.Serializable;
import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor @NoArgsConstructor @Data @Builder
@Entity
@Table(name="PERFILES")
public class Perfil implements Serializable{
	
	
	private static final long serialVersionUID = 1L;
	
	@Id
	@Column(name="ID_PERFIL")
	@GeneratedValue(strategy =GenerationType.IDENTITY )
	
	private int idPerfil;
	private String nombre;
	
	
	public Perfil() {
		super();
	}


	public Perfil(int idPerfil, String nombre) {
		super();
		this.idPerfil = idPerfil;
		this.nombre = nombre;
	}


	public int getIdPerfil() {
		return idPerfil;
	}


	public void setIdPerfil(int idPerfil) {
		this.idPerfil = idPerfil;
	}


	public String getNombre() {
		return nombre;
	}


	public void setNombre(String nombre) {
		this.nombre = nombre;
	}


	@Override
	public int hashCode() {
		return Objects.hash(idPerfil);
	}


	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Perfil other = (Perfil) obj;
		return idPerfil == other.idPerfil;
	}


	@Override
	public String toString() {
		return "Perfil [idPerfil=" + idPerfil + ", nombre=" + nombre + "]";
	}
	

	
}
